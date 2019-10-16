import { gql } from 'apollo-server-express';
const SECRET = "dfasdfa324desfdfsfasdf32";
const jwt = require("jsonwebtoken");


let movies = [
  {
    //scoutbase_rating: 4,
    title: "Harry Potter and the Deathly Hallows: Part 2",
    year: 2011,
    rating: 5,
    actors: {
      name: "Calph Fiennes",
      birthday: "05-02-1985",
      country: "UK",
      directors: {
        name: "David Yates",
        birthday: "01-01-1980",
        country: "USA"
      }
    }
  }
]


export const Query = gql`
 extend type Query {
  movies: [Movie]
 }
`;

export const queryResolvers = {
 Query: {
  //movies: () => (movies)
  movies: (_, {}, context) => {
    let user;
    const token =
        context.req.body.token ||
        context.req.query.token ||
        context.req.headers["x-access-token"] ||
        context.req.headers["Authorization"] ||
        context.req.headers["authorization"];        
        if (token) {
          const decoded = jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {              
              throw new Error(err);
            } else {
              return decoded;
            }
          });
          user = decoded.user;          
          
        }
        if (user) {          
            movies.forEach(i => {
              i['scoutbase_rating'] = (Math.random() * (9.0 - 5.0) + 5.0).toFixed(1);              
            });            
            return movies;         
        } else {          
            return movies;
        }        
  }
 }
};