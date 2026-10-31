const { Client, GatewayIntentBits, Events } = require("discord.js");
const requireDir = require("require-dir");
const slashCommands = requireDir("../discord_command");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
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
 * @param {import("discord.js").CommandInteraction} interaction
 * @returns {void}
 */
async function onInteraction(interaction) {
    if (interaction.isChatInputCommand())
        return commands[interaction.commandName](interaction);
    else if (interaction.isButton()) {
        const commandName = interaction.message.interaction.commandName;
        return commands[commandName](interaction);
    }
}
client.on(Events.InteractionCreate, (interaction) =>
    onInteraction(interaction).catch((err) => console.error(err))
);
client.login(process.env.BOT_TOKEN).catch((err) => {
    console.error(err);
});

/**
 * @returns {TenguSlashCommands} 天狗ダイス内のコマンド
 */
function getExecuteCommands() {
    const commands = {};
    for (let s in slashCommands) {
        commands[s] = slashCommands[s].execute;
    }
    return commands;
}
