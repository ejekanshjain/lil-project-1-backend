const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({

}, {
    timestamps: true
})

module.exports = mongoose.model('About', AboutSchema)