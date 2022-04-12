const request = require('supertest');
const { server } = require('../src/server');
const { default: Bot } = require('ringcentral-chatbot-core/dist/models/Bot');
const nock = require('nock');


const groupId = 'groupId';
const accessToken = 'accessToken';
const botId = 'botId';
const rcUserId = 'rcUserId';
const cardId = 'cardId';

beforeAll(async () => {
    await Bot.create({
        id: botId,
        token: {
            access_token: accessToken
        }
    })
});

afterAll(async () => {
    await Bot.destroy({
        where: {
            id: botId
        }
    });
})

describe('cardHandler', () => {
    describe('validations', () => {
        test('unknown bot id - 400', async () => {
            // Arrange
            const postData = {
                data: {
                    botId: 'unknownBotId'
                },
                user: {}
            }

            // Act
            const res = await request(server).post('/interactive-messages').send(postData)

            // Assert
            expect(res.status).toEqual(400);
            expect(res.text).toEqual('Error');
        })
    });

    describe('update card', () => {
        test('return the updated card', async () => {
            // Arrange
            let requestBody = null;
            const updatedCardScope = nock(process.env.RINGCENTRAL_SERVER)
                .persist()
                .put(`/restapi/v1.0/glip/adaptive-cards/${cardId}`)
                .reply(200, 'OK');

            const postData = {
                data: {
                    botId,
                    actionType: 'update'
                },
                user: {
                    extId: rcUserId
                },
                conversation: {
                    id: groupId
                },
                card: {
                    id: cardId
                }
            }
            updatedCardScope.once('request', ({ headers: requestHeaders }, interceptor, reqBody) => {
                requestBody = JSON.parse(reqBody);
            });

            // Act
            const res = await request(server).post('/interactive-messages').send(postData)

            // Assert
            expect(res.status).toEqual(200);

            expect(requestBody.type).toBe('AdaptiveCard');
            expect(requestBody.body[0].text).toBe('Updated');

            // Clean up
            updatedCardScope.done();
        });
    })
});