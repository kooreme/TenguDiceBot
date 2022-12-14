const { Client, Intents } = require("discord.js");
const requireDir = require("require-dir");
const slashCommands = requireDir("./discord_command");

const FLAGS = Intents.FLAGS;

const client = new Client({
    intents: [FLAGS.GUILDS, FLAGS.DIRECT_MESSAGES],
});

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
 * @property {TenguSlashCommand} snd
 * @property {TenguSlashCommand} tb
 */

/**
 * @param {Discord.CommandInteraction} interaction
 * @returns {void}
 */
async function onInteraction(interaction) {
    if (interaction.isCommand())
        return commands[interaction.commandName](interaction);
    else if (interaction.isButton()) {
        const commandName = interaction.message.interaction.commandName;
        return commands[commandName](interaction);
    }
}
client.on("interactionCreate", (interaction) =>
    onInteraction(interaction).catch((err) => console.error(err))
);
client.login(process.env.BOT_TOKEN).catch((err) => {
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
