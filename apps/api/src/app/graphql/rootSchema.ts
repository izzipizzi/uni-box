
// const {RoomMutation,RoomQuery} = require('./roomQuery')
// const PropertyQuery = require('./propertyQuery')
// const {ItemQuery,ItemMutation} = require('./itemQuery')
// const CommentQuery = require('./commentQuery')

import {UserQuery,UserMutation} from './userSchema'
import {MaterialQuery,MaterialMutation} from './materialSchema'
import {GraphQLObjectType, GraphQLSchema} from "graphql";

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...UserMutation,
    ...MaterialMutation,
  }
})
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...UserQuery,
    ...MaterialQuery,
  }
})

export default new GraphQLSchema({
  query: Query,
  mutation:Mutation
})
