const Discord = require("discord.js");
const requireDir = require("require-dir");
const slashCommands = requireDir("./discord_command");

/**
 * @typedef {Object} TenguSlashCommand
 * @property {Object} command
 * @method execute
 */

const commands = getExecuteCommands();

/**
 * @typedef {Object} TenguSlashCommands
 * @property {TenguSlashCommand} ct
 * @property {TenguSlashCommand} fnd
 * @property {TenguSlashCommand} nd
 * @property {TenguSlashCommand} tb
 */

/**
 * @param {Discord.CommandInteraction} interaction 
 * @returns {void}
 */
async function onInteraction(interaction) {
  if (!interaction.isCommand()) return;
  return commands[interaction.commandName](interaction);
}
const client = new Discord.Client({
  intents: 0
});
client.on("interactionCreate", interaction => onInteraction(interaction).catch(err => console.error(err)));
client.login(process.env.BOT_TOKEN).catch(err => {
  console.error(err);
  process.exit(-1);
});

/**
 * @returns {TenguSlashCommands} 天狗ダイス内のコマンド
 */
function getExecuteCommands() {
  const commands = {};
  for (let s in slashCommands) {
    commands[s] = slashCommands[s].execute;
  }
  //console.log(commands);
  return commands;

}