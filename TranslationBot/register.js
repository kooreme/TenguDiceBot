const { Client, ClientApplication } = require("discord.js");
const requireDir = require("require-dir");
/** @type {{ [path: string]: import('./classes/BaseDiscordCommand') }} */
const slashCommands = requireDir("./discord_command");
/** @typedef {import("discord.js").Snowflake} Snowflake */
/** @typedef {import("discord.js").ApplicationCommand} ApplicationCommand */
/** @typedef {import("discord.js").ApplicationCommandData} ApplicationCommandData */
/** @typedef {import("discord.js").Collection} Collection */

/**
 *
 * @param {Client} client
 * @param {ApplicationCommandData[]} commands
 * @param {Snowflake} guildID
 * @returns {Promise<Collection<string,ApplicationCommand>>}
 */
async function register(client, commands, guildID) {
    if (guildID == null) {
        return client.application.commands.set(commands);
    }
    const guild = await client.guilds.fetch(guildID);
    return guild.commands.set(commands);
}

/**
 * コマンド定義の配列を得ます．
 * @returns コマンドの定義データの配列です．
 */
function getCommands() {
    const array = [];
    for (let s in slashCommands) {
        if (slashCommands[s].command) array.push(slashCommands[s].command);
    }
    return array;
}

const commands = getCommands();
const client = new Client({ intents: 0 });
client.token = process.env.BOT_TOKEN_2;

(async function () {
    client.application = new ClientApplication(client, {});
    await client.application.fetch();
    await register(client, commands, null);
    console.log("翻訳bot registration succeed!");
})().catch((err) => console.error(err));
