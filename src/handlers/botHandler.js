const { Template } = require('adaptivecards-templating');

const updateButtonCardTemplate = require('../adaptiveCards/updateButtonCard.json');

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
                        const template = new Template(updateButtonCardTemplate);
                        const cardData = {
                            botId: messageBot.id,
                            groupId: group.id
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