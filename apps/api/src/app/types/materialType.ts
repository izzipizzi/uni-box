import {GraphQLID, GraphQLObjectType, GraphQLString} from "graphql";

require('dotenv').config()

const MaterialType = (types) => new GraphQLObjectType({
  name: 'Material',
  fields: () => ({
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    texture: {
      type: GraphQLString,
      resolve(parent, args) {
        return `${process.env.URI}materials/${parent._id}`
      }
    }
  })
})
  export default MaterialType
