const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    whatAreWe: {
        type: String,
        required: true
    },
    whatWereWe: {
        type: String,
        required: true
    },
    whatWeDo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('About', AboutSchema)