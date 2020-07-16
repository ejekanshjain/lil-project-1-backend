const express = require('express')

const { checkUserAuthenticated } = require('../../middlewares')
const { Curator } = require('../../models')
const { upload: { bucket, uploader }, transformCurator } = require('../../util')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const curators = await Curator.find({
            deleted: req.query.deleted === 'true' ? true : false
        }).sort({
            createdAt: -1
        })
        res.json({
            status: 200,
            success: true,
            data: {
                curators: curators.map(transformCurator)
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
        const curators = await Curator.findOne({
            _id: req.params.id
        })

        if (!curators)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        res.json({
            status: 200,
            success: true,
            data: {
                curators: transformCurator(curators)
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
    const { name, email, contactNumber, title, description, github, linkedin, twitter } = req.body

    if (!contactNumber)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Contact Number is required!'
        })
    if (!name)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Name is required!'
        })
    if (!email)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Email is required!'
        })
    if (!title)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Title is required!'
        })
    if (!description)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Description is required!'
        })
    if (!github)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Github is required!'
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
            const curator = await Curator.create({
                name,
                email,
                contactNumber,
                title,
                description,
                github,
                linkedin,
                twitter,
                imageUrl: publicUrl
            })
            res.status(201).json({
                status: 201,
                success: true,
                message: 'Added Successfully!',
                data: {
                    curator: transformCurator(curator)
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
    const { name, email, contactNumber, title, description, github, linkedin, twitter } = req.body

    if (!name)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Name is required!'
        })
    if (!email)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Email is required!'
        })
    if (!contactNumber)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Contact Number is required!'
        })
    if (!title)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Title is required!'
        })
    if (!description)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Description is required!'
        })
    if (!github)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Github is required!'
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
        const curator = await Curator.findOne({
            _id: req.params.id
        })

        if (!curator)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        curator.name = name
        curator.email = email
        curator.contactNumber = contactNumber
        curator.title = title
        curator.description = description
        curator.github = github
        curator.linkedin = linkedin
        curator.twitter = twitter

        if (!req.file) {
            await curator.save()
            res.json({
                status: 200,
                success: true,
                message: 'Updated Successfully!',
                data: {
                    curator: transformCurator(curator)
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
                curator.imageUrl = publicUrl
                await curator.save()
                res.json({
                    status: 200,
                    success: true,
                    message: 'Updated Successfully!',
                    data: {
                        curator: transformCurator(curator)
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
        const curator = await Curator.findOne({ _id: req.params.id })
        if (!curator)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        curator.deleted = req.query.delete === 'false' ? false : true

        await curator.save()

        res.json({
            status: 200,
            success: true,
            data: {
                curator: transformCurator(curator)
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