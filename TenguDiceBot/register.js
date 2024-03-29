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
    if (guildID == null) {
        return client.application.commands.set(commands);
    }
    const guild = await client.guilds.fetch(guildID);
    return guild.commands.set(commands);
}

const commands = getCommands();
const client = new Client({
    intents: 0,
});

const TEST = process.env.TEST_GUILD_ID ?? null;
client.token = process.env.BOT_TOKEN;
async function main() {
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
