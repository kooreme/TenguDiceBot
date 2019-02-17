const Discord = require('discord.js');

const client = new Discord.Client();

const dice = require('./dice');

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content.search(/^ping /) !== -1) {

       message.reply('pong');
       console.log('pong');

       }

});

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret