const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoUrl: {
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

module.exports = mongoose.model('Course', CourseSchema)