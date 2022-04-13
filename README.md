
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Heroku Steps
1. Deploy with above button
2. Fill in params and create
   1. IM_SHARED_SECRET (from Developer Portal -> App Settings)
   2. RINGCENTRAL_CHATBOT_CLIENT_ID
   3. RINGCENTRAL_CHATBOT_CLIENT_SECRET
3. Go to Setting and Config Vars
   1. Copy DATABASE_URL value and paste to RINGCENTRAL_CHATBOT_DATABASE_CONNECTION_URI
   2. Copy domain (find it in Domains, https://your-service-name.herokuapp.com) and paste to RINGCENTRAL_CHATBOT_SERVER
4. Go to Developer Portal -> App Settings
   1. Change OAuth Redirect URI to {RINGCENTRAL_CHATBOT_SERVER}/bot/oauth
   2. If Interactive Messages enabled, change Outbound Webhook URL to {RINGCENTRAL_CHATBOT_SERVER}/interactive-messages
5. Go to Bot tab and `Add to RingCentral`

# To Test
1. Go to https://app.devtest.ringcentral.com
2. Search for your bot. It should show `welcome` upon conversation open.
3. type command `hello`. It should reply `hello`.
4. type command `card`. It should send a card with a name on it.
5. submit a new name with the card. It should update the card.
6. type command `card` again. It should show the new name tha is just given.