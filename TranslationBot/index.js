const Discord = require("discord.js");
const requireDir = require("require-dir");
const slashCommands = requireDir("./discord_command");
const DB = require("./classes/db");
const tw = require("./classes/google-translation-v3");

const NG_ID = ["902543000176050176"];
const PERMIT_BOT_ID = ["547091962277396490","546661972498841601","470521294119501845"];

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_WEBHOOKS"],
});

const cacheWebhooks = new Map();

client.on("ready", () => console.log("翻訳bot ready!"));

client.on("interactionCreate", interaction => onInteraction(interaction).catch(err => console.error(err)));

client.on("messageCreate", message => onMessageCreate(message).catch(err => console.error(err)));

client.on("messageUpdate", (oldMessage,newMessage) => onMessageUpdate(oldMessage,newMessage).catch(err => console.error(err)));

client.login(process.env.BOT_TOKEN_2).catch(err => {
  console.error(err);
  process.exit(-1);
});

/**
 * 
 * @param {import("discord.js").Message} message 
 */
async function onMessageCreate(message) {

  //message.contentが空なら弾く。（deferReply->editReplyについてはmessageUpdateでケアする。）
  if(message.content === "") return;
  //自分自身を弾く
  if(NG_ID.includes(message.author.id)) return;
  //許可したbot以外を弾く
  if(message.author.bot && !(PERMIT_BOT_ID.includes(message.author.id))) return;

  console.log("onMessageCreate -> sendTranslatedText");
  sendTranslatedText(message);
}

async function onMessageUpdate(oldMessage,newMessage) {
  //許可したbotで、oldMessage.contentが空で、newMessage.contentが空でない場合のみ許可する。
  if(newMessage.author.bot &&
    PERMIT_BOT_ID.includes(newMessage.author.id) &&
    oldMessage.content === "" &&
    newMessage.content !== "") 
  {
    console.log("onMessageUpdate -> sendTranslatedText");
    sendTranslatedText(newMessage);    
  }
}

async function sendTranslatedText(message) {

  const toPostChannels = await DB.fetchChannels(message.channelId);
  //翻訳先チャンネルがないなら弾く
  if (!toPostChannels || toPostChannels.length === 0) return;

  const nickname = message.member.nickname ?? message.author.username;
  const avatarURL = message.author.avatarURL({dynamic : true});
  for (const t of toPostChannels) {
    const translatedContent = await tw.translateText(message.content,t.from_language, t.to_language)
    const id = t.to_channel;
    toChannel = await message.client.channels.fetch(id);
    const webhook = await getWebhookInChannel(toChannel);
    console.log(webhook);

    for (content of translatedContent) {
      webhook.send({
        content : `${content}\n${message.content}`,
        username : `${nickname}(translate)`,
        avatarURL : avatarURL,
      }).catch(e => console.error(e));
      
          
//      await toChannel.send(`**${nickname}** :\n${content}\n  ${message.content}`).catch(e => console.error(e));
//      await toChannel.send(`||${message.url}||\n${message.author.username} :\n${content}`).catch(e => console.error(e));
    }
  }
}

async function getWebhookInChannel(channel) {
    const webhook = cacheWebhooks.get(channel.id) ?? await getWebhook(channel)
    return webhook;
}

async function getWebhook(channel) {
  const webhooks = await channel.fetchWebhooks();
  const webhook = webhooks?.find((v) => v.token) ?? await channel.createWebhook("Translation bot Jake");
  if (webhook) cacheWebhooks.set(channel.id, webhook);
  return webhook;
}

async function onInteraction(interaction) {
  if (!interaction.isCommand()) return;
  return await slashCommands[interaction.commandName].execute(interaction);
}

