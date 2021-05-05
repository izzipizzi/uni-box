const mongoose = require('mongoose')
const crypto = require('crypto')
const ObjectId = require("mongoose/lib/schema/objectid");
const {uuid} = require('uuidv4')


//при ств схем в бд не юзти стрілкові функціїї
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 32

    },
    hashed_password: {
      type: String,
      required: true
    },

    salt: String,
    role: {
      type: String,
      enum: ['USER','ADMIN'],
      default: 'USER'
    },
    boxes: [{type: ObjectId, ref: 'Box'}],

  },
  {timestamps: true}
)

//Віртуальне поле?
userSchema.virtual('password')
  .get(function () {
    return this._password
  })
  .set(function (password) {
    this._password = password
    this.salt = uuid()
    this.hashed_password = this.encryptPassword(password)

  })

userSchema.methods.encryptPassword = function (password) {
  if (!password) return ''
  try {
    return crypto.createHmac('sha1', this.salt)
      .update(password)
      .digest('hex')
  } catch (error) {
    return ''
  }

}
userSchema.methods.authenticate = function (plainText) {
  return this.encryptPassword(plainText) === this.hashed_password
}

module.exports = mongoose.model('User', userSchema,'user')
