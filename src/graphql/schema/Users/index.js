import { Users, typeResolvers } from './_type';
 import { Query, queryResolvers } from './_query';
// //import inputTypes from './_input';
 import { mutationTypes, mutationResolvers } from './_mutation';


const UserSchema = {
    type: Users,
    typeResolvers,
    query:Query,
    queryResolvers,
    mutationTypes,
    mutationResolvers      
}

export default UserSchema;

