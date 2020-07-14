const express = require('express')

const { checkUserAuthenticated } = require('../../middlewares')
const { TeamMember } = require('../../models')
const { upload: { bucket, uploader }, transformTeamMember } = require('../../util')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const teamMembers = await TeamMember.find({
            deleted: req.query.deleted === 'true' ? true : false
        })
        res.json({
            status: 200,
            success: true,
            data: {
                teamMembers: teamMembers.map(transformTeamMember)
            }
        })
    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', err)
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something Went Wrong!'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const teamMember = await TeamMember.findOne({
            _id: req.params.id
        })

        if (!teamMember)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        res.json({
            status: 200,
            success: true,
            data: {
                teamMember: transformTeamMember(teamMember)
            }
        })
    } catch (err) {
        if (err.name === 'CastError')
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Invalid Object Id!'
            })
        console.log('\x1b[31m%s\x1b[0m', err)
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something Went Wrong!'
        })
    }
})

router.post('/', checkUserAuthenticated, uploader.single('image'), async (req, res) => {
    if (!req.file)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'No File Provided!'
        })
    if (req.fileValidationError)
        return res.status(400).json({
            status: 400,
            success: false,
            message: req.fileValidationError
        })
    const { name, contactNumber, email, description, linkedin, twitter } = req.body

    if (!name)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Name is required!'
        })
    if (!contactNumber)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Contact Number is required!'
        })
    if (!email)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Email is required!'
        })
    if (!description)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Description is required!'
        })
    if (!linkedin)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Linkedin is required!'
        })
    if (!twitter)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Twitter is required!'
        })

    try {
        const blob = bucket.file(req.file.originalname)

        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })

        blobWriter.on('error', err => {
            console.log('\x1b[31m%s\x1b[0m', err)
            res.status(500).json({
                status: 500,
                success: false,
                message: 'Something Went Wrong!'
            })
        })

        blobWriter.on('finish', async () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`
            const teamMember = await TeamMember.create({
                name,
                contactNumber,
                email,
                description,
                linkedin,
                twitter,
                imageUrl: publicUrl
            })
            res.status(201).json({
                status: 201,
                success: true,
                message: 'Added Successfully!',
                data: {
                    teamMember: transformTeamMember(teamMember)
                }
            })
        })

        blobWriter.end(req.file.buffer)
    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', err)
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something Went Wrong!'
        })
    }
})

router.patch('/:id', checkUserAuthenticated, uploader.single('image'), async (req, res) => {
    if (req.file && req.fileValidationError)
        return res.status(400).json({
            status: 400,
            success: false,
            message: req.fileValidationError
        })
    const { name, contactNumber, email, description, linkedin, twitter } = req.body

    if (!name)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Name is required!'
        })
    if (!contactNumber)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Contact Number is required!'
        })
    if (!email)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Email is required!'
        })
    if (!description)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Description is required!'
        })
    if (!linkedin)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Linkedin is required!'
        })
    if (!twitter)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Twitter is required!'
        })

    try {
        const teamMember = await TeamMember.findOne({
            _id: req.params.id
        })

        if (!teamMember)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        teamMember.name = name
        teamMember.email = email
        teamMember.contactNumber = contactNumber
        teamMember.description = description
        teamMember.linkedin = linkedin
        teamMember.twitter = twitter

        if (!req.file) {
            await teamMember.save()
            res.json({
                status: 200,
                success: true,
                message: 'Updated Successfully!',
                data: {
                    teamMember: transformTeamMember(teamMember)
                }
            })
        } else {
            const blob = bucket.file(req.file.originalname)

            const blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: req.file.mimetype
                }
            })

            blobWriter.on('error', err => {
                console.log('\x1b[31m%s\x1b[0m', err)
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: 'Something Went Wrong!'
                })
            })

            blobWriter.on('finish', async () => {
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`
                teamMember.imageUrl = publicUrl
                await teamMember.save()
                res.json({
                    status: 200,
                    success: true,
                    message: 'Updated Successfully!',
                    data: {
                        teamMember: transformTeamMember(teamMember)
                    }
                })
            })

            blobWriter.end(req.file.buffer)
        }
    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', err)
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something Went Wrong!'
        })
    }
})

router.delete('/:id', checkUserAuthenticated, async (req, res) => {
    try {
        const teamMember = await TeamMember.findOne({ _id: req.params.id })
        if (!teamMember)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        teamMember.deleted = req.query.delete === 'false' ? false : true

        await teamMember.save()

        res.json({
            status: 200,
            success: true,
            data: {
                teamMember: transformTeamMember(teamMember)
            },
            message: `${req.query.delete === 'false' ? 'Restored' : 'Deleted'} Successfully!`
        })
    } catch (err) {
        if (err.name === 'CastError')
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Invalid Object Id!'
            })
        console.log('\x1b[31m%s\x1b[0m', err)
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something Went Wrong!'
        })
    }
})

module.exports = router