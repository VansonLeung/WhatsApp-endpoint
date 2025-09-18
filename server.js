const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Webhook verification (GET request)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Handle incoming messages (POST request)
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'whatsapp_business_account') {
    body.entry.forEach(entry => {
      entry.changes.forEach(change => {
        if (change.field === 'messages') {
          const messages = change.value.messages;
          if (messages) {
            messages.forEach(message => {
              handleMessage(message, change.value.metadata.phone_number_id);
            });
          }
        }
      });
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Function to handle incoming messages
async function handleMessage(message, phoneNumberId) {
  const from = message.from;
  const messageId = message.id;
  const messageType = message.type;

  if (messageType === 'text') {
    const messageBody = message.text.body;
    console.log(`Received message from ${from}: ${messageBody}`);

    // Echo the message back
    await sendMessage(from, `Echo: ${messageBody}`, phoneNumberId);
  }
}

// Function to send a message
async function sendMessage(to, message, phoneNumberId) {
  try {
    const url = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;
    const data = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: {
        body: message
      }
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    };

    const response = await axios.post(url, data, { headers });
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.response.data);
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
