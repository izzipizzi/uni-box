const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema


// модель стрічки(бантика на кробці)
const tapeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true,
  },
  position: {    //top-left, top-right, centered, bottom-left, bottom-right
    type: String,
    enum: ['CENTER', 'CORNER'],
    required: true
  },
  width: {    //2sm,3sm,5sm, ширина банта
    type: Number,
    required: true
  },


}, {
  timestamps: true
})
module.exports = mongoose.model('Tape', tapeSchema)
