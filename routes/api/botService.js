const express = require('express');
const watson = require('watson-developer-cloud');

const router = express.Router();

var assistant = new watson.AssistantV2({
    iam_apikey: process.env.ASSISTANT_API_KEY,
    version: '2018-11-08',
    url: process.env.ASSISTANT_URL
});

router.get('/initializeSession', (req, res) => {
    try {
        assistant.createSession({
            assistant_id: process.env.ASSISTANT_ID,
        },
            (err, response) => {
                var sessionData;
                if (err) {
                    console.error(err);
                } else {
                    console.log(JSON.stringify(response));
                    sessionData = res.json(response);
                }

                return sessionData;
            });
    }
    catch (err) {
        console.log('\x1b[31m%s\x1b[0m', err)
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something Went Wrong!'
        })
    }
});

router.post('/msg', async (req, res) => {

    var assistant_id = process.env.ASSISTANT_ID || '9a5d37fa-1880-4013-9b15-82d7c04cb4a0';

    var payload = {
        assistant_id: assistant_id,
        input: {}
    };
    try {
        if (req.body) {

            if (req.body.msg) {
                payload.input = req.body.msg;
            }

            if (req.body.sessionId) {
                payload.session_id = req.body.session_id;
            }

            await assistant.message(payload, (err, data) => {
                var response;
                if (err) {
                    response = res.status(err.code || 500).json(err);
                } else {
                    response = res.json(data);
                }

                return response;
            });
        }
    }
    catch (err) {
        console.log('\x1b[31m%s\x1b[0m', err)
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something Went Wrong!'
        })
    }
});

module.exports = router;