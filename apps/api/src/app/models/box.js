const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema


const boxSchema = new mongoose.Schema({
  name: {
    type: String
  },
  model: {
    type: String,
    enum: ['SQUARE', 'ROUNDED', 'HEART'],
    default: 'SQUARE',
    required: true,
  },
  texture: {
    type: ObjectId,
    ref: 'Image',
  },
  tape: {
    type: ObjectId,
    ref: 'Tape',
    required: false,
  },
  material: {
    type: ObjectId,
    ref: 'Material',

  },
  color: {
    type: String,
    default: '#ffffff'//білого кольору
  },

  width: {    // 20 sm
    type: Number,
    default: 20
  },
  length: {    //20sm,
    type: Number,
    default: 20,

  },
  height: { //10sm висоти
    type: Number,
    default: 20,

  },
  price: {
    type: Number,
    default: 20,

  },
  user: {
    type: ObjectId,
    ref:'User',
    required: true
  },
  textureScaleX:{
    type: Number,
    required: true,
  },
  textureScaleY:{
    type: Number,
    required: true

  },
  textureOffsetX:{
    type: Number,
    required: true,


  },
  textureOffsetY:{
    type: Number,
    required: true

  },
  textureRotation:{
    type: Number,
    default :0,
    required: true

  },
  previewImg:{
    type: ObjectId,
    ref: 'Photo',

  },
  validated:{
    type: Boolean,
    default:false
  },
  public:{
    type: Boolean,
    default:false
  },
  declined:{
    type: Boolean,
    default:false
  }

}, {
  timestamps: true
})
module.exports = mongoose.model('Box', boxSchema)
