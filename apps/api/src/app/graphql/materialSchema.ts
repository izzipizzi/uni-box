import {GraphQLID, GraphQLList, GraphQLString} from "graphql";

const {ObjectId} = require('bson')


const Material = require('../../models/material')
import types from '../types/rootType'

export const MaterialMutation = {
  sign_in:{
    type: types.MaterialType,
    resolve(parent,args){
      return "21"
    }
  }
  // addItem: {
  //   type: ItemType,
  //   args: {
  //     name: {type: GraphQLString},
  //     property: {type: GraphQLID}
  //
  //   },
  //   resolve(parent, args) {
  //     const item = new Item({
  //       name: args.name,
  //       property: args.property
  //     })
  //     return item.save()
  //   }
  // },
  // duplicateItem: {
  //   type: ItemType,
  //   args: {
  //     id: {type: GraphQLID},
  //     name: {type: GraphQLString}
  //   },
  //   async resolve(parent, args) {
  //     let item = await Item.findById(args.id).populate('room')
  //
  //     item._id = new ObjectId()
  //     item.name = args.name
  //     item.isNew = true
  //     await Room.findByIdAndUpdate(item.room, {$push: {items: item}})
  //     return item.save()
  //
  //   }
  // },
  // skipItem: {
  //   type: ItemType,
  //   args: {
  //     id: {type: GraphQLID},
  //   },
  //   resolve(parent, args) {
  //     return Item.findByIdAndUpdate(args.id, {$set: {state: 'SKIPPED'}},{new:true})
  //   }
  // },
  // deleteItem: {
  //   type: ItemType,
  //   args: {id: {type: GraphQLID}},
  //   resolve(parent, args) {
  //     return Item.findByIdAndRemove(args.id)
  //   }
  // },
  // changeFunctional:{
  //   type:ItemType,
  //   args:{id:{type:GraphQLID},state:{type:GraphQLString}},
  //   resolve(parent,args){
  //     return Item.findByIdAndUpdate(args.id,{$set:{ functional : args.state}},{new:true})
  //   }
  // },
  // changeCleanliness:{
  //   type:ItemType,
  //   args:{id:{type:GraphQLID},state:{type:GraphQLString}},
  //   resolve(parent,args){
  //     return Item.findByIdAndUpdate(args.id,{$set:{ cleanliness : args.state}},{new:true})
  //   }
  // },

}

export const MaterialQuery = {
  materials: {
    type: new GraphQLList(types.MaterialType),
    resolve() {
      return Material.find({})
    }
  }

}

