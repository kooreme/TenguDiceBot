const Discord = require("discord.js");
const requireDir = require("require-dir");
const slashCommands = requireDir("../discord_command");


const commands = getExecuteCommands();

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

function getExecuteCommands() {
  const commands = {};
  for (let s in slashCommands) {
    commands[s] = slashCommands[s].execute;
  }
  //console.log(commands);
  return commands;

}