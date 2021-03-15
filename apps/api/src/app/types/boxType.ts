import {GraphQLEnumType, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql";
import MaterialType from "./materialType";

const Tape = require('../../models/tape')
const Material = require('../../models/material')
const User = require('../../models/user')
require('dotenv').config()

const ModelEnumType = new GraphQLEnumType({
  name: 'ModelEnum',
  values: {
    SQUARE: {
      value: 'SQUARE',
    },
    ROUND: {
      value: 'ROUND',
    },
    HEART: {
      value: 'HEART',
    },
  },
})

const BoxType = (types) => new GraphQLObjectType({
  name: 'Box',
  fields: () => ({
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    model: {type: ModelEnumType},
    color: {type: GraphQLString},
    width: {type: GraphQLInt},
    height: {type: GraphQLInt},
    length: {type: GraphQLInt},
    tape: {
      type: types.TapeType,
      resolve(parent, args) {
        return Tape.findById(parent.tape)
      }
    },
    material: {
      type: types.MaterialType,
      resolve(parent, args) {
        return Material.findById(parent.material)
      }
    },
    user: {
      type: types.UserType,
      resolve(parent, args) {
        return User.findById(parent.user)
      }
    },
  })
})
export default BoxType
