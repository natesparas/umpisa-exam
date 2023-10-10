const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
