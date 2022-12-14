const ND_DiceRollHandler = require("../tengu_dice/nd_diceRollHandler");
const NJDiscordReply = require("../tengu_dice/NJDiscordReply");
const { setTimeout: wait } = require("timers/promises");
const { isSendableMessage } = require("../util/util");
const error = require("../tengu_dice/nd_errormessage");
const { MessageActionRow, MessageButton } = require("discord.js");

const OPTION_NAME = ["sentence"];
const BUTTON_CUSTOM = {
    id: "publishing-result",
    label: "結果を公開する",
};

const snd = {
    command: {
        name: "snd",
        description:
            "天狗ダイスでシークレットダイスロールします。結果はあなたにしか見えません。",
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
     * @param {import("discord.js").Interaction} interaction
     * @returns {void}
     */
    execute: async function (interaction) {
        //ephemeralで表示
        if (interaction.isCommand()) {
            await interaction.deferReply({ ephemeral: true });
            const { commandName } = interaction;
            const option = interaction.options.get(OPTION_NAME[0])?.value;
            const NDDice = ND_DiceRollHandler(option, interaction.channelId);

            let reply = await NJDiscordReply.createMessage(
                await NDDice.receiveDiceRoll().catch((e) => {
                    return e.discordMessage;
                })
            );

            await wait(50);
            await interaction.editReply({
                content: isSendableMessage(
                    "`/" + commandName + " " + option + "`\n" + reply,
                    error
                ),
                components: [
                    new MessageActionRow().addComponents(
                        new MessageButton()
                            .setCustomId(BUTTON_CUSTOM.id)
                            .setLabel(BUTTON_CUSTOM.label)
                            .setStyle(1)
                    ),
                ],
            });
        }
        //結果を公開
        else if (interaction.isButton()) {
            if (interaction.customId === BUTTON_CUSTOM.id) {
                const message = await interaction.channel.send({
                    content:
                        "**シークレットダイス公開** \n" +
                        interaction.message.content,
                });
                interaction.update({
                    content: "公開しました \n" + message.url,
                    components: [],
                });
            }
        }
    },
};

/**
 * @exports TenguSlashCommand
 */
module.exports = snd;
