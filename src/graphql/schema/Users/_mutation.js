const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { gql } from 'apollo-server-express';
const SECRET = "dfasdfa324desfdfsfasdf32";

export const mutationTypes = gql`
extend type Mutation {
    createUser(username: String, password: String): UserData
    login(username: String, password: String): UserData
}`;


export const mutationResolvers = {
    Mutation:{
        createUser: async (parent,data, { db }, context) => {
            let createUser;
            
            try {                
                const hashPwd = await bcrypt.hash(data.password, 12);                
                createUser = await db.user.create({                  
                    username: data.username,
                    password: hashPwd
                });               
                const token = jwt.sign(
                    {
                      user: { username: createUser.username, id: createUser.id }
                    },
                    SECRET,
                    {
                      expiresIn: "1d"
                    }
                  );                
                return { token: token, user: { createUser: createUser.username, id: createUser.id } };                
              } catch (err) {
                throw err;
              }
            
            
        },

        login: async (parent,data, { db }, context) => {
            let findUser;
            
            try {                
                
                findUser = await db.user.findOne({                  
                    username: data.username
                });                
                if(!findUser){
                    throw new Error("No user found");
                }
                const validPassword = await bcrypt.compare(data.password,findUser.password );                                
                if (!validPassword) {
                    throw new Error("Incorrect password");
                  }
                const token = jwt.sign(
                    {
                      user: { username: findUser.username, id: findUser.id }
                    },
                    SECRET,
                    {
                      expiresIn: "1d"
                    }
                  );
                console.log(token);
                return { token: token, user: { username: findUser.username, id: findUser.id } };                
              } catch (err) {
                throw err;
              }
            
            
        }
    }
};
