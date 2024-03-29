const ND_DiceRollHandler = require("../tengu_dice/nd_diceRollHandler");
const NJDiscordReply = require("../tengu_dice/NJDiscordReply");
const { setTimeout : wait } = require("timers/promises");
const {isSendableMessage} = require("../util/util");
const error = require("../tengu_dice/nd_errormessage");

const OPTION_NAME = ["sentence"];

const nd = {
    command : {
        name : "nd",
        description : "天狗ダイスでダイスロールします。",
        options : [
            {
                type : "STRING",
                name : OPTION_NAME[0],
                description : "実施したいダイスロールを入力してください。詳細はnoteを確認してください。",
                required : true,
            }
        ],    
    },
    /**
    * 
    * @param {import("discord.js").CommandInteraction} interaction 
    * @returns {void}
    */
     execute : async function(interaction) {
        if (!interaction.isCommand()) return;
        await interaction.deferReply();
        const {commandName} = interaction;
        const option = interaction.options.get(OPTION_NAME[0])?.value;
        const NDDice = ND_DiceRollHandler(option, interaction.channelId);
        
        let reply = await NJDiscordReply.createMessage(
            await NDDice.receiveDiceRoll()
            .catch((e) => {return e.discordMessage;})
        );

        await wait(50);
        await interaction.editReply(isSendableMessage("`/" + commandName + " " + option + "`\n" + reply, error));
                
    }
};

/**
 * @exports TenguSlashCommand
 */
module.exports = nd;