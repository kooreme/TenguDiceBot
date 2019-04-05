const Discord = require('discord.js');

const client = new Discord.Client();

const dice = require('./diceroll');
const kt_dice = require('./kt_diceroll');
const kt_quest = require('./ktq_quest');
const Log = require('./log.js');

client.on('ready', () => {

    Log.prints('I am ready!');

});

//メッセージ反応部
const REACT_REGEXP = /^\/nd /;
const REACT_REGEXP_KATAMICHI = /^\/kd /;
const REACT_REGEXP_KTQUEST = /^\/ktq /;
const REACT_REGEXP_KTDJ = /^\/kdj /;

client.on('message', message => {
    let content = message.content;
    if (content.search(REACT_REGEXP) !== -1) {

        content = content.replace(REACT_REGEXP, '');

        message.reply(dice.receiveDiceRoll(content));
        Log.prints('content : ' + content);

        }
    else if (content.search(REACT_REGEXP_KATAMICHI) !== -1) {
        content = content.replace(REACT_REGEXP_KATAMICHI, '');

        message.reply(kt_dice.receiveDiceRoll(content));
        Log.prints('content : ' + content);
    }
    else if (content.search(REACT_REGEXP_KTQUEST) !== -1) {
        content = content.replace(REACT_REGEXP_KTQUEST, '');

        message.reply(kt_quest.receiveQuest(content));
        Log.prints('content : ' + content);
    }
    else if (content.search(REACT_REGEXP_KTDJ) !== -1) {
        content = content.replace(REACT_REGEXP_KTDJ, '');

        message.channel.send('!stop');
        Log.prints('content : ' + content);
        message.channel.send('!play ' + content + '.mp3');
    }
});

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret