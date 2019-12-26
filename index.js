const Discord = require('discord.js');

const client = new Discord.Client();

const dice = require('./nd_diceroll');
const kt_dice = require('./kt_diceroll');
const kt_quest = require('./ktq_quest');
const Log = require('./log.js');
const PG = require('./postgres.js');
const sqlTest = require('./sqltest.js');

client.on('ready', () => {
    PG.connect();
    Log.prints('I am ready!',true);
});

//メッセージ反応部
const REACT_REGEXP_NINJA = /^\/nd /;
const REACT_REGEXP_NINJAFIX = /^\/ndf /;
const REACT_REGEXP_KATAMICHI = /^\/kd /;
const REACT_REGEXP_KTQUEST = /^\/ktq /;
const REACT_REGEXP_KTFIX = /^\/kdf /;
const REACT_REGEXP_TEST = /^\/test /;

client.on('message', message => {
    let content = message.content;
    if (content.search(REACT_REGEXP_NINJA) !== -1) {

        content = content.replace(REACT_REGEXP_NINJA, '');

        message.reply(dice.receiveDiceRoll(content));
        Log.prints('content : ' + content);

    }
    else if (content.search(REACT_REGEXP_NINJAFIX) !== -1) {

        content = content.replace(REACT_REGEXP_NINJAFIX, '');
    
        message.reply(dice.receiveFixedMessage(content));
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
    else if (content.search(REACT_REGEXP_KTFIX) !== -1) {
        content = content.replace(REACT_REGEXP_KTFIX, '');

        message.reply(kt_dice.receiveFixedMessage(content));
        Log.prints('content : ' + content);
    }
    else if (content.search(REACT_REGEXP_TEST) !== -1) {
        content = content.replace(REACT_REGEXP_TEST,'');
        message.reply(sqlTest.replyMessage(content));
    }
});

// THIS  MUST  BE  THIS  WAY

// eslint-disable-next-line no-undef
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret