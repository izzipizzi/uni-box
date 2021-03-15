const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema


const boxSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type:String,
        enum: ['SQUARE','ROUND','HEART'],
        default: 'square',
        required: true,
    },

    tape: {
        type: ObjectId,
        ref: 'Tape',
        required: false,
    },
    material: {
        type: ObjectId,
        required: true,
        ref: 'Material',

    },
    color: {
        type: String,
        required: true,
        default: '#ffffff'//білого кольору
    },

    width: {    // 20 sm
        type: Number,
        default: 20,
        required: true
    },
    length: {    //20sm,
        type: Number,
        default: 20,
        required: true
    },
    height: { //10sm висоти
        type: Number,
        default: 20,
        required: true,
    },
    user: {
        type: ObjectId,
        required: true
    }


}, {
    timestamps: true
})
module.exports = mongoose.model('Box', boxSchema)
