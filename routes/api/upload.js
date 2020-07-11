const express = require('express')
const multer = require('multer')
const { Storage } = require('@google-cloud/storage')

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
})

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL)

const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
})

const router = express.Router()

router.post('/', uploader.single('image'), async (req, res, next) => {
    if (!req.file)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'No File Provided!'
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

        blobWriter.on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`
            console.log(publicUrl)
            res.status(201).json({
                status: 201,
                success: true,
                message: 'Upload Successful',
                publicUrl
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

module.exports = router