const ND_DiceRollHandler = require("../tengu_dice/nd_diceRollHandler");
const NJDiscordReply = require("../tengu_dice/NJDiscordReply");
const { setTimeout: wait } = require("timers/promises");
const { isSendableMessage } = require("../util/util");
const error = require("../tengu_dice/nd_errormessage");

const OPTION_NAME = ["sentence"];

const nd = {
    command: {
        name: "nd",
        description: "天狗ダイスでダイスロールします。",
        options: [
            {
                type: "STRING",
                name: OPTION_NAME[0],
                description:
                    "実施したいダイスロールを入力してください。詳細はnoteを確認してください。",
                required: true,
            },
        ],
    },
    /**
     *
     * @param {string} commandName
     * @param {string} sentence
     * @param {string} channelId
     * @returns {void}
     */
    execute: async function ({ commandName, sentence, channelId }) {
        console.log(`args: ${sentence}, channelId: ${channelId}`);
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

/**
 * @exports TenguSlashCommand
 */
module.exports = nd;
