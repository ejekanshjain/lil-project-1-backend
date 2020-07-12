module.exports = user => ({
    _id: user._id,
    _v: user._v,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
})