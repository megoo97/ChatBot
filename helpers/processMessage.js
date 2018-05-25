const API_AI_TOKEN ='1f117928905e44999b05d2b0ae41b965';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAACkmNB2MUABALW3wQkL0P7QgSYRJVQ2kCBtZAa5Kb25QjlXW3ZCT0hd6QlBNXclucxCbCCDHBZCd7c1Pyaj1TFOkyRSpcuviqFq1ZBNsDWDjgdUjZCLmfRXBtbXjBxgSzmUnGfHox5ECwbtxlXnvL4gaZCJKLpGTaiGQjZBkxxIgZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: "POST",
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
 console.log(message);
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};