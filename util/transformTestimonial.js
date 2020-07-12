module.exports = testimonial => ({
    _id: testimonial._id,
    name: testimonial.name,
    email: testimonial.email,
    comment: testimonial.comment,
    imageUrl: testimonial.imageUrl,
    createdAt: testimonial.createdAt,
    updatedAt: testimonial.updatedAt
})