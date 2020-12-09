const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            index: true     //helps in querying the DB efficiently
        },
        role: {
            type: String,
            default: "subscriber",
        },
        cart: {
            type: Array,
            default: []
        },
        address: String,
    },
    {timestamps: true}      //fields like createdAt and updatedAt are automatically added
)

module.exports = mongoose.model('User', userSchema)