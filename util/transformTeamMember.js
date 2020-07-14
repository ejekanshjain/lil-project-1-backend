module.exports = teamMember => ({
    _id: teamMember._id,
	name: teamMember.name,
	email: teamMember.email,
	contactNumber: teamMember.contactNumber,
	description: teamMember.description,
	linkedin: teamMember.linkedin,
	twitter: teamMember.twitter,
	imageUrl: teamMember.imageUrl,
    createdAt: teamMember.createdAt,
    updatedAt: teamMember.updatedAt
})