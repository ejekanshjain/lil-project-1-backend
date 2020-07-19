const express = require('express')

const { checkUserAuthenticated } = require('../../middlewares')
const { Course } = require('../../models')
const { transformCourse } = require('../../util')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({
            deleted: req.query.deleted === 'true' ? true : false
        }).sort({
            createdAt: -1
        })
        res.json({
            status: 200,
            success: true,
            data: {
                courses: courses.map(transformCourse)
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
        const course = await Course.findOne({
            _id: req.params.id
        })

        if (!course)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        res.json({
            status: 200,
            success: true,
            data: {
                course: transformCourse(course)
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

router.post('/', checkUserAuthenticated, async (req, res) => {
    const { title, videoUrl } = req.body
    if (!title || !videoUrl)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Title & Video Url is required!'
        })
    try {
        const course = await Course.create({
            title,
            videoUrl
        })
        res.status(201).json({
            status: 201,
            success: true,
            message: 'Added Successfully!',
            data: {
                course: transformCourse(course)
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

router.delete('/:id', checkUserAuthenticated, async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id })
        if (!course)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        course.deleted = req.query.delete === 'false' ? false : true

        await course.save()

        res.json({
            status: 200,
            success: true,
            data: {
                course: transformCourse(course)
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