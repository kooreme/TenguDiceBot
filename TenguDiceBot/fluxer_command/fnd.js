const ND_DiceRollHandler = require("../tengu_dice/nd_diceRollHandler");
const NJDiscordReply = require("../tengu_dice/NJDiscordReply");
const { setTimeout: wait } = require("timers/promises");

const fnd = {
    /**
     * @param {string} commandName
     * @param {string} sentence
     * @param {string} channelId
     * @returns {string}
     */
    execute: async function ({ commandName, sentence, channelId }) {
        const option = sentence;
        const NDDice = ND_DiceRollHandler(option, channelId);
        let reply = await NJDiscordReply.createFixedDiceMessage(NDDice).catch(
            (e) => e.discordMessage
        );

        await wait(50);
        return "`/" + commandName + " " + sentence + "`\n" + reply;
    },
};

module.exports = fnd;
