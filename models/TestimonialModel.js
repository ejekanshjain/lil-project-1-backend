const mongoose = require('mongoose')

const TestimonialSchema = new mongoose.Schema({

}, {
    timestamps: true
})

module.exports = mongoose.model('Testimonial', TestimonialSchema)