import { gql } from 'apollo-server-express';


export const Users = gql`
  type User {
    id: ID
    username: String
  }
  type UserData {
    token: String
    user: User
  }
`;  

export const typeResolvers = {

};