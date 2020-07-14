const express = require('express')

const { checkUserAuthenticated } = require('../../middlewares')
const { Gallery } = require('../../models')
const { transformGallery, upload: { uploader, bucket } } = require('../../util')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const gallery = await Gallery
            .find({
                deleted: req.query.deleted === 'true' ? true : false
            }).sort({
                createdAt: -1
            })
        res.json({
            status: 200,
            success: true,
            data: {
                gallery: gallery.map(transformGallery)
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
        const gallery = await Gallery.findOne({
            _id: req.params.id
        })

        if (!gallery)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        res.json({
            status: 200,
            success: true,
            data: {
                gallery: transformGallery(gallery)
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
    const { label } = req.body
    if (!label)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Label is required!'
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
            const gallery = await Gallery.create({
                label,
                imageUrl: publicUrl
            })
            res.status(201).json({
                status: 201,
                success: true,
                message: 'Added Successfully!',
                data: {
                    gallery: transformGallery(gallery)
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

router.delete('/:id', checkUserAuthenticated, async (req, res) => {
    try {
        const gallery = await Gallery.findOne({ _id: req.params.id })
        if (!gallery)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        gallery.deleted = req.query.delete === 'false' ? false : true

        await gallery.save()

        res.json({
            status: 200,
            success: true,
            data: {
                gallery: transformGallery(gallery)
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