const { Client, Events, parsePrefixCommand } = require("@fluxerjs/core");
const requireDir = require("require-dir");
const fluxerCommands = requireDir("../fluxer_command");

const client = new Client();
const PREFIX = "/";
const commands = getExecuteCommands();

/**
 * @typedef {Object} TenguSlashCommand
 * @property {Object} command
 * @method execute
 */

/**
 * @typedef {Object} TenguSlashCommands
 * @property {TenguSlashCommand} ct
 * @property {TenguSlashCommand} fnd
 * @property {TenguSlashCommand} nd
 * @property {TenguSlashCommand} snd
 * @property {TenguSlashCommand} tb
 */

/**
 * @param {Discord.CommandInteraction} message
 * @returns {void}
 */
async function onMessage(message) {
    if (message.author.bot || !message.content) return;

    const parsed = parsePrefixCommand(message.content, PREFIX);
    if (!parsed) return;

    const { command, args } = parsed;

    if (commands[command] && args.length === 1) {
        const commandArgs = {
            commandName: command,
            sentence: args[0],
            channelId: message.channelId,
        };
        await message.reply(await commands[command](commandArgs));
    }
}

client.on(Events.MessageCreate, async (message) =>
    onMessage(message).catch((err) => console.error(err))
);
client.on(Events.Ready, () => {
    console.log(`Logged in as ${client.user?.username}`);
});

client.login(process.env.FLUXER_BOT_TOKEN).catch((err) => {
    console.error(err);
});

/**
 * @returns {TenguSlashCommands} 天狗ダイス内のコマンド
 */
function getExecuteCommands() {
    const commands = {};
    for (let s in fluxerCommands) {
        commands[s] = fluxerCommands[s].execute;
    }
    //console.log(commands);
    return commands;
}
