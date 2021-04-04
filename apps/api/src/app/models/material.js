const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema


// модель матеріала коробки
const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  texture: {
    type: ObjectId,
    ref: 'Image',
  },
  user:{
    type: ObjectId,
    ref: 'User'
  }




}, {
  timestamps: true
})
module.exports = mongoose.model('Material', materialSchema)
