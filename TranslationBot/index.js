const Discord = require("discord.js");
const requireDir = require("require-dir");
const slashCommands = requireDir("./discord_command");
const DB = require("./classes/db");
const tw = require("./classes/google-translation-v3");

const NG_ID = ["902543000176050176"];
const PERMIT_BOT_ID = ["547091962277396490","546661972498841601","470521294119501845"];

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

client.on("ready", () => console.log("翻訳bot ready!"));

client.on("interactionCreate", interaction => onInteraction(interaction).catch(err => console.error(err)));

client.on("messageCreate", message => onMessageCreate(message).catch(err => console.error(err)));

client.login(process.env.BOT_TOKEN_2).catch(err => {
  console.error(err);
  process.exit(-1);
});

/**
 * 
 * @param {import("discord.js").Message} message 
 */
async function onMessageCreate(message) {
  //自分自身を弾く
  if(NG_ID.includes(message.author.id)) return;
  //許可したbot以外を弾く
  if(message.author.bot && !(PERMIT_BOT_ID.includes(message.author.id))) return;
  const test = await DB.fetchChannels(message.channelId);
  //翻訳先チャンネルがないなら弾く
  if (test.length === 0) return;

  const nickname = message.member.nickname ?? message.author.username;
  for (const t of test) {
    const translatedContent = await tw.translateText(message.content,t.from_language, t.to_language)
    const id = t.to_channel;
    toChannel = await message.client.channels.fetch(id);
    for (content of translatedContent) {
      await toChannel.send(`**${nickname}** :\n${content}\n  ${message.content}`).catch(e => console.error(e));
//      await toChannel.send(`||${message.url}||\n${message.author.username} :\n${content}`).catch(e => console.error(e));
    }
  }
}

async function onInteraction(interaction) {
  if (!interaction.isCommand()) return;
  return await slashCommands[interaction.commandName].execute(interaction);
}

