const Discord = require('discord.js');

const client = new Discord.Client();

const dice = require('./nd_diceroll');
const kt_dice = require('./kt_diceroll');
const kt_quest = require('./ktq_quest');
const Log = require('./log.js');
const Record = require('./record.js');

client.on('ready', () => {
    Log.prints('I am ready!',true);
});

//メッセージ反応部
const REACT_REGEXP_NINJA = /^\/nd /;
const REACT_REGEXP_NINJAFIX = /^\/ndf /;
const REACT_REGEXP_KATAMICHI = /^\/kd /;
const REACT_REGEXP_KTQUEST = /^\/ktq /;
const REACT_REGEXP_KTFIX = /^\/kdf /;
const REACT_REGEXP_TENGUBANK = /^\/tb /;

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
    else if (content.search(REACT_REGEXP_TENGUBANK) !== -1) {
        content = content.replace(REACT_REGEXP_TENGUBANK,'');
        Log.printsDir(message);
        Log.prints(message.channel.id);
        Record.receiveResponce(message,content).then(result => {
            message.reply(result);
        });
    }
});

// THIS  MUST  BE  THIS  WAY

// eslint-disable-next-line no-undef
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

//定期実行設定
const cron = require('node-cron');
const fs = require('fs');

cron.schedule('45 41 3,15 * * *', () => {
    fs.copyFile('./.data/db.json', './.data/db.json.bak-' + getSaveTimeFormat(), (err) => {
        if (err) {
            console.log(err.stack);
        }
        else {
            console.log('Done.');
        }
    });
    const dirPath = './.data/';
    fs.readdir(dirPath, function(err, files){
        if (err) throw err;
        var fileList = files.filter(function(file){
            return fs.statSync(dirPath + file).isFile() && /\.bak/.test(file);
        })
        console.log(fileList);
        if (fileList.length > 3) {
            fs.unlinkSync(dirPath + fileList[0]);
        }
    });
});
function getSaveTimeFormat() {
    const date = new Date();
    return String(date.getFullYear()) +
    String((date.getMonth()+ 1) >= 10 ? date.getMonth()+1 : '0' + (date.getMonth()+1)) +
    String(date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()) + 
    String(date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + 
    String(date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + 
    String(date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds());
}
