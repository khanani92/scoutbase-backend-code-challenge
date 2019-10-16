import fs from 'fs';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
import { merge } from 'lodash';
import root from './root';
const db = require('../../models');
const SECRET = "dfasdfa324desfdfsfasdf32";
//console.log('-',db)


const Query = gql`
 extend type Query {
   status: String  
 }
`;

const Mutation = `
extend type Mutation {
   _empty: String
 }
`;

let resolvers = {
 Query: {
   status: () => 'ok'  
 }
};

const typeDefs = [root, Query, Mutation];

//Read the current directory and load types and resolvers automatically
fs.readdirSync(__dirname)
 .filter(dir => (dir.indexOf('.') < 0))
 .forEach((dir) => {
   const tmp = require(path.join(__dirname, dir)).default; // eslint-disable-line
   resolvers = merge(resolvers, tmp.queryResolvers);         
   if(tmp.mutationResolvers != {}){ resolvers = merge(resolvers, tmp.mutationResolvers);}
   typeDefs.push(tmp.type);
   typeDefs.push(tmp.query);
   if(tmp.mutationTypes){typeDefs.push(tmp.mutationTypes)};   
 });

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  //context:{ db },
  context: ({ req, res }) => ({    
    req: req,
    res: res,
    db: db
  }),
  playground:{
    endpoint:'/graphql',
    settings:{
      'editor.theme':'light'
    }
  }
})

export default schema;