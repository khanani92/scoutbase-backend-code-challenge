import { Movies, typeResolvers } from './_type';
 import { Query, queryResolvers } from './_query';
// //import inputTypes from './_input';
 import { mutationTypes, mutationResolvers } from './_mutation';


const MovieSchema = {
    type: Movies,
    typeResolvers,
    query:Query,
    queryResolvers,
    mutationTypes,
    mutationResolvers      
}

export default MovieSchema;

