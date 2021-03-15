import {GraphQLEnumType, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql";
import MaterialType from "./materialType";

require('dotenv').config()



const TapePositionEnumType = new GraphQLEnumType({
  name: 'TapePositionEnum',
  values: {
    CENTER: {
      value: 'CENTER',
    },
    CORNER: {
      value: 'CORNER',
    },
    HEART: {
      value: 'HEART',
    },
  },
})

const TapeType = (types) => new GraphQLObjectType({
  name: 'Tape',
  fields: () => ({
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    color: {type: GraphQLString},
    position: {type: TapePositionEnumType},
    width: {type: GraphQLInt},
    texture: {
      type: GraphQLString,
      resolve(parent, args) {

        return `${process.env.mongodb_uri}materials/${parent._id}`

      }
    }
  })
})
export default  TapeType
