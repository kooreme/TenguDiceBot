const { Client, Events, parsePrefixCommand } = require("@fluxerjs/core");
const requireDir = require("require-dir");
const fluxerCommands = requireDir("../fluxer_command");

const client = new Client();
const PREFIX = "/";
const commands = getExecuteCommands();

/**
 * @returns {void}
 */
async function onMessage(message) {
    if (message.author.bot || !message.content) return;

    const parsed = parsePrefixCommand(message.content, PREFIX);
    if (!parsed) return;

    const { command } = parsed;
    const args = [parsed.args.join("")];

    if (commands[command] && args.length === 1) {
        const commandArgs = {
            commandName: command,
            sentence: args[0],
            channelId: message.channelId,
            guildOwnerId: message.guild.ownerId,
            authorId: message.author.id,
        };
        await respond(message, await commands[command](commandArgs));
    }
}

// 返信の仕方はここだけに集約
async function respond(message, result) {
    if (!result) return;

    // 文字列でも配列でも、配列に正規化して扱う
    const chunks = Array.isArray(result) ? result : [result];

    const [first, ...rest] = chunks;
    await message.reply(first); // 1通目だけ reply
    for (const chunk of rest) {
        await message.channel.send(chunk); // 2通目以降は send
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
