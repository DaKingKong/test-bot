const { Template } = require('adaptivecards-templating');
const submitCardTemplate = require('../adaptiveCards/submitCard.json');

const { testModel } = require('../models/testModel');

const testId = 'testId';

const botHandler = async event => {
    try {
        switch (event.type) {
            case 'BotJoinGroup':
                const { group: joinedGroup, bot: joinedBot } = event;
                await joinedBot.sendMessage(joinedGroup.id, { text: 'welcome' });
                break;
            case 'Message4Bot':
                const { text, group, bot: messageBot } = event;
                console.log(`=====incomingCommand.Message4Bot.${text}=====`);
                switch (text) {
                    case 'hello':
                        await messageBot.sendMessage(group.id, { text: 'hello' });
                        break;
                    case 'card':
                        let testData = await testModel.findByPk(testId);
                        if (!testData) {
                            testData = await testModel.create({
                                id: testId,
                                name: 'Test Name'
                            })
                        }
                        const template = new Template(submitCardTemplate);
                        const cardData = {
                            botId: messageBot.id,
                            groupId: group.id,
                            testId,
                            testName: testData.name
                        }
                        const card = template.expand({
                            $root: cardData
                        });
                        await messageBot.sendAdaptiveCard(group.id, card);
                        break;
                }
        }
    }
    catch (e) {
        console.log(e);
    }
}

exports.botHandler = botHandler;