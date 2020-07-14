const mongoose = require('mongoose')

const GallerySchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Gallery', GallerySchema)