const mongoose = require('mongoose')

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    twitter: {
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

module.exports = mongoose.model('TeamMember', TeamMemberSchema)