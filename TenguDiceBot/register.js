require("dotenv").config();
const { Client, ClientApplication } = require("discord.js");
const requireDir = require("require-dir");
const slashCommands = requireDir("./discord_command");
/**
 *
 * @param {Client} client
 * @param {import("discord.js").ApplicationCommandData[]} commands
 * @param {import("discord.js").Snowflake} guildID
 * @returns {Promise<import("@discordjs/collection").Collection<string,import("discord.js").ApplicationCommand>>}
 */
async function register(client, commands, guildID) {
    // 第2引数に guildId を渡せば、guild を fetch せずにギルドコマンドを登録できる
    return client.application.commands.set(commands, guildID ?? undefined);
}

const commands = getCommands();
const client = new Client({
    intents: [],
});

const TEST = process.env.TEST_GUILD_ID ?? null;
async function main() {
    client.rest.setToken(process.env.BOT_TOKEN);
    client.application = new ClientApplication(client, {});
    await client.application.fetch();
    await register(client, commands, TEST);
    console.log("registration succeed!");
}
main().catch((err) => console.error(err));

function getCommands() {
    const array = [];
    for (let s in slashCommands) {
        if (slashCommands[s].command) array.push(slashCommands[s].command);
    }
    return array;
}
