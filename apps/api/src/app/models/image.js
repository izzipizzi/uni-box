const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const imageSchema = new mongoose.Schema({

  data: Buffer,
  contentType: String

}, {
  timestamps: true
});
module.exports = mongoose.model('Photo', imageSchema);
