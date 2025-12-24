const express = require('express');
const app = express();

const VERIFY_TOKEN = 'whatsapp_webhook_test';

app.get('/', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook verified successfully');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

app.use(express.json());

app.post('/', (req, res) => {
    console.log('Incoming webhook:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.listen(10000, () => {
    console.log('Webhook server running on port 10000');
});
