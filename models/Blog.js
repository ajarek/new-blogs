const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({

    name: {
        type: String,

    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
    },
    text: {
        type: String,
    },

}, {
    timestamps: true
})
module.exports = mongoose.model('Post', PostSchema)