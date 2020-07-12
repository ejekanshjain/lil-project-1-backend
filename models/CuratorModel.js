const mongoose = require('mongoose')

const CuratorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Curator', CuratorSchema)