const Bot = require('ringcentral-chatbot-core/dist/models/Bot').default;
const { Template } = require('adaptivecards-templating');
const textCardTemplate = require('../adaptiveCards/textCard.json');

const { testModel } = require('../models/testModel');

const cardHandler = async req => {
    const submitData = req.body.data;
    const cardId = req.body.card.id;
    console.log(`=====incomingCard=====\n${JSON.stringify(req.body, null, 2)}`);
    const bot = await Bot.findByPk(submitData.botId);
    if (bot) {
        switch (submitData.actionType) {
            case 'update':
                const testData = await testModel.findByPk(submitData.testId);
                testData.testName = submitData.testName;
                await testData.save();
                const template = new Template(textCardTemplate);
                const cardData = {
                    title: 'Name Updated',
                    text: `Name has been updated to ${testData.testName}.`
                };
                const card = template.expand({
                    $root: cardData
                });
                await bot.updateAdaptiveCard(cardId, card);
                break;
        }
    }
}

exports.cardHandler = cardHandler;