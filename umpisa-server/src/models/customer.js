const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    address: {
        type: String
    },
    contactno: {
        type: String
    }
})

const CustomerModel = mongoose.model('Customer', customerSchema)

module.exports = CustomerModel
