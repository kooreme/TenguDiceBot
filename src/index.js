const Discord = require('discord.js');
const client = new Discord.Client();

const dice = require('./tengu_dice/nd_diceroll');
//const kt_dice = require('./katamichi_dice/kt_diceroll');
//const kt_quest = require('./katamichi_dice/ktq_quest');
const Log = require('./util/log');
const Record = require('./tengu_bank/record');
const CTCommand = require('./ct_command/ctcommand');

client.on('ready', () => {
    Log.prints('I am ready!',true);
});

//メッセージ反応部
const REACT_REGEXP_NINJA = /^\/nd /;
const REACT_REGEXP_NINJAFIX = /^\/ndf /;
//const REACT_REGEXP_KATAMICHI = /^\/kd /;
//const REACT_REGEXP_KTQUEST = /^\/ktq /;
//const REACT_REGEXP_KTFIX = /^\/kdf /;
const REACT_REGEXP_TENGUBANK = /^\/tb /;
const REACT_REGEXP_CREATETABLE = /^\/ct /;

client.on('message', async message => {
    let content = message.content;
    //NJSLYR用ダイスロール
    if (content.search(REACT_REGEXP_NINJA) !== -1) {

        content = content.replace(REACT_REGEXP_NINJA, '');
        const NDDice = new dice.NDDiceRoll(content,message);
        message.reply(await NDDice.receiveDiceRoll());
        Log.prints('content : ' + content);

    }
    //NJSLYRの表参照
    else if (content.search(REACT_REGEXP_NINJAFIX) !== -1) {

        content = content.replace(REACT_REGEXP_NINJAFIX, '');
        const NDDice = new dice.NDDiceRoll(content,message);
        message.reply(await NDDice.receiveFixedMessage());
        Log.prints('content : ' + content);

    }
    //片道用ダイスロール
/*    else if (content.search(REACT_REGEXP_KATAMICHI) !== -1) {
        content = content.replace(REACT_REGEXP_KATAMICHI, '');
        const KTDice = new kt_dice.KTDiceRoll(content);
        message.reply(KTDice.receiveDiceRoll(content));
        Log.prints('content : ' + content);
    }
    //片道クエスト参照
    else if (content.search(REACT_REGEXP_KTQUEST) !== -1) {
        content = content.replace(REACT_REGEXP_KTQUEST, '');

        message.reply(kt_quest.receiveQuest(content));
        Log.prints('content : ' + content);
    }
    //片道表参照
    else if (content.search(REACT_REGEXP_KTFIX) !== -1) {
        content = content.replace(REACT_REGEXP_KTFIX, '');

        message.reply(kt_dice.receiveFixedMessage(content));
        Log.prints('content : ' + content);
    }
*/
    //天狗銀行
    else if (content.search(REACT_REGEXP_TENGUBANK) !== -1) {
        content = content.replace(REACT_REGEXP_TENGUBANK,'');
        Log.printsDir(message);
        Log.prints(message.channel.id);
        
        message.reply(await Record.receiveResponce(message,content));
    }
    //専用表作成
    else if (content.search(REACT_REGEXP_CREATETABLE) !== -1) {
        content = content.replace(REACT_REGEXP_CREATETABLE,'');
        
        const reply = await CTCommand.run(message,content).then((v) => v);
        //通常はリプライ
        if(typeof reply === 'string') message.reply(reply);
        //文字数が多く、１回で表示しきれない場合は複数回に分け、sendする。
        //checktablelist,checktabledataがこれになりそう。
        else reply.forEach((elm) => message.channel.send(elm));


    }
});

// THIS  MUST  BE  THIS  WAY

// eslint-disable-next-line no-undef
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret