const mongoose = require('mongoose')

const TeamMemberSchema = new mongoose.Schema({

}, {
    timestamps: true
})

module.exports = mongoose.model('TeamMember', TeamMemberSchema)