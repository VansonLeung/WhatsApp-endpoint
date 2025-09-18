# WhatsApp Bot with Node.js and Express

This is a simple WhatsApp bot that echoes back any text message it receives.

## Prerequisites

- Node.js installed
- A WhatsApp Business Account
- Access to Facebook Developer Console for WhatsApp API

## Setup

1. Clone or download this project.

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables in `.env`:
   - `ACCESS_TOKEN`: Your WhatsApp API access token from Facebook Developer Console
   - `VERIFY_TOKEN`: A token you set for webhook verification
   - `PHONE_NUMBER_ID`: Your WhatsApp phone number ID
   - `PORT`: Port for the server (default 3000)

4. In Facebook Developer Console:
   - Create a WhatsApp app
   - Set up webhooks pointing to your server's `/webhook` endpoint (must be HTTPS)
   - Subscribe to `messages` field

5. For local development, use ngrok to expose your local server to HTTPS:
   ```
   npm install -g ngrok
   ngrok http 3000
   ```
   Use the ngrok URL for the webhook in Facebook Developer Console.

## Running the Bot

Start the server:
```
npm start
```

For development with auto-restart:
```
npm run dev
```

## How it Works

- The bot listens for incoming messages via webhooks.
- When a text message is received, it echoes it back with "Echo: " prefix.
- Supports only text messages for now.

## API Reference

Based on WhatsApp Business Platform:
- [Webhooks](https://developers.facebook.com/docs/whatsapp/webhooks)
- [Conversation Types](https://developers.facebook.com/docs/whatsapp/conversation-types)

## Security

- Ensure your server is running on HTTPS.
- Keep your access tokens secure.
- Verify webhook signatures if needed (not implemented in this basic version).
# WhatsApp-endpoint
