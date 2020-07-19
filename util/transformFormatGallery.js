module.exports = course => ({
    _id: course._id,
    label: course.label,
    original: course.imageUrl,
    thumbnail: course.imageUrl,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt
})