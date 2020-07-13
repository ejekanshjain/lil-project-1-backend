module.exports = course => ({
    _id: course._id,
    title: course.title,
    videoUrl: course.videoUrl,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt
})