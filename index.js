const Discord = require('discord.js');

const client = new Discord.Client();

const dice = require('./dice');

client.on('ready', () => {

    console.log('I am ready!');

});

//メッセージ反応部
const REACT_REGEXP = /^\/nd /g;
client.on('message', message => {

    if (message.content.search(REACT_REGEXP) !== -1) {

       message.reply(dice.receiveDiceRoll(message.content));
       console.log('pong');

       }

});

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret