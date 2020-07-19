const mongoose = require('mongoose')

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    imageUrl: {
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

module.exports = mongoose.model('Testimonial', TestimonialSchema)