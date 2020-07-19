const mongoose = require('mongoose')

const AdminPanelUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('AdminPanelUser', AdminPanelUserSchema)