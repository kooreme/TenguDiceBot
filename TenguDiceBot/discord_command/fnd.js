const ND_DiceRollHandler = require("../tengu_dice/nd_diceRollHandler");
const NJDiscordReply = require("../tengu_dice/NJDiscordReply");
const { setTimeout : wait } = require("timers/promises");

const OPTION_NAME = ["table"];

const fnd = {
    command : {
        name : "fnd",
        description : "登録されている効果表から任意の出目で文言を引き出します。",
        options : [
            {
                type : "STRING",
                name : OPTION_NAME[0],
                description : "「（確認したいテーブル名）#（数字）」と入力してください。",
                required : true,
            },
        ],    
    },
    /**
    * 
    * @param {import("discord.js").CommandInteraction} interaction 
    * @returns 
    */
     execute : async function(interaction) {
        if (!interaction.isCommand()) return;
        await interaction.deferReply();
        const {commandName} = interaction;
        const option = interaction.options.get(OPTION_NAME[0])?.value;

        const NDDice = ND_DiceRollHandler(option, interaction.channelId);
        
        let reply = await NJDiscordReply.createFixedDiceMessage(NDDice).catch((e) => e.discordMessage);

        await wait(50);
        await interaction.editReply("`/" + commandName + " " + option + "`\n" + reply);
    }
};

module.exports = fnd;