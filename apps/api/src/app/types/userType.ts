import MaterialType from "./materialType";

const graphql = require('graphql')
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql

const Box = require('../models/box')

const UserType = (types) => new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    hashed_password: {type:GraphQLString},
    salt:{type:GraphQLString},
    boxes: {
      type: new GraphQLList(types.BoxType),
      resolve(parent, args) {
        return Box.find({user: parent._id})

      }
    }
  })
})
export default  UserType
