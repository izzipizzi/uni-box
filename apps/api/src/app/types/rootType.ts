// const UserInject = require('./userType')
import UserInject from './userType'
import MaterialInject from './materialType'
import TapeInject from './tapeType'
import BoxInject from './boxType'
import {GraphQLObjectType} from "graphql";


const types = {
  UserType: new GraphQLObjectType({
    name:'',
    fields:() => ({})
  }),
  MaterialType: new GraphQLObjectType({
    name:'',
    fields:() => ({})
  }),
  BoxType: new GraphQLObjectType({
    name:'',
    fields:() => ({})
  }),
  TapeType: new GraphQLObjectType({
    name:'',
    fields:() => ({})
  }),

}
types.UserType = UserInject(types)
types.MaterialType = MaterialInject(types)
types.BoxType = BoxInject(types)
types.TapeType = TapeInject(types)

export default {...types}
