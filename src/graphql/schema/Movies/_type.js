import { gql } from 'apollo-server-express';


export const Movies = gql`
  type Directors {
    id: ID
    name: String!
    birthday: String!
    country: String!
  }
  type Actors {
    id: ID
    name: String!
    birthday: String!
    country: String!
    directors: Directors!
  }
  type Movie {
    id: ID
    scoutbase_rating: Float
    title: String!
    year: Int!
    rating: Int!
    actors: Actors!
  }
`;  

export const typeResolvers = {

};