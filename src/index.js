const { extendApp } = require('ringcentral-chatbot-core');
const { botHandler } = require('./handlers/botHandler');
const { TestModel } = require('./models/testModel');


// extends or override express app as you need
exports.appExtend = (app) => {
const skills = [];
const botConfig = {
    adminRoute: '/admin', // optional
    botRoute: '/bot', // optional
    models: { // optional
        TestModel
    }
}

extendApp(app, skills, botHandler, botConfig);

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT);
}

console.log('server running...');
console.log(`bot oauth uri: ${process.env.RINGCENTRAL_CHATBOT_SERVER}${botConfig.botRoute}/oauth`);


}