const ND_DiceRollHandler = require("../tengu_dice/nd_diceRollHandler");
const NJDiscordReply = require("../tengu_dice/NJDiscordReply");
const { setTimeout: wait } = require("timers/promises");
const { isSendableMessage } = require("../util/util");
const error = require("../tengu_dice/nd_errormessage");

const nd = {
    /**
     * @param {string} commandName
     * @param {string} sentence
     * @param {string} channelId
     * @returns {string}
     */
    execute: async function ({ commandName, sentence, channelId }) {
        const NDDice = ND_DiceRollHandler(sentence, channelId);

        let reply = await NJDiscordReply.createMessage(
            await NDDice.receiveDiceRoll().catch((e) => {
                return e.discordMessage;
            })
        );

        await wait(50);
        return isSendableMessage(
            "`/" + commandName + " " + sentence + "`\n" + reply,
            error
        );
    },
};

module.exports = nd;
