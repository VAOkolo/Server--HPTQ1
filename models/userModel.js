const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    scores: {
        type: Number,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Users', userSchema)
