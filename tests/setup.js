const { default: Bot } = require('ringcentral-chatbot-core/dist/models/Bot');

jest.setTimeout(30000);

beforeAll(async () => {
  await Bot.sync();
});
