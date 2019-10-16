import { gql } from 'apollo-server-express';

let users = [
  {
    id: 4,
    username: 'khanani92'
  }
]

export const Query = gql`
 extend type Query {
  users: [User]
 }
`;

export const queryResolvers = {
 Query: {
  users: () => (users)
 }
};