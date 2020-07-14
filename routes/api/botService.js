const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const express = require('express')
const router = express.Router();

const assistant = new AssistantV1({
    authenticator: new IamAuthenticator({ apikey: 'Zt1lrOnpnD0Zhn4lEmHDfOK3DUjQtKfqalUkRq-DgumX' }),
    url: 'https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/5e221b9f-4218-4b71-abe2-9fe95341147d',
    version: '2018-07-10'
});


router.post('/message', async (req, res) => {

    const payload = {
        workspaceId: process.env.WORKSPACE_ID || '13e6bf89-a37f-4f52-889b-304b71767f37',
        input: {
        },
    };
    try {
        if (req.body) {

            if (req.body.message) {
                payload.input.text = req.body.message;
            }

            if (req.body.conversation_id) {
                payload.conversation_id = req.body.conversation_id;
            }
            await assistant.message(payload, (err, data) => {

                if (err) {
                    response = res.status(err.code || 500).json(err);
                } else {

                    res.json({
                        status: 200,
                        success: true,
                        result: {
                            message: data.result.output.text,
                            conversation_id: data.result.context.conversation_id
                        }
                    });
                }

            });
        }
        else {
            res.status(500).json({
                status: 500,
                success: false,
                message: 'Please provide message feild with this api to get'
            })
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

module.exports = router



