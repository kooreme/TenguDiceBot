const Discord = require("discord.js");
const ND_DiceRollHandler = require("../TenguDiceBot/tengu_dice/nd_diceRollHandler");
const NJDiscordReply = require("../TenguDiceBot/tengu_dice/NJDiscordReply");
const { setTimeout : wait } = require("timers/promises");

const OPTION_NAME = ["table"];

const ndf = {
    command : {
        name : "ndf",
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
    * @param {Discord.CommandInteraction} interaction 
    * @returns 
    */
     execute : async function(interaction) {
        if (!interaction.isCommand()) return;
        await interaction.deferReply();

        const NDDice = ND_DiceRollHandler(interaction.options.get(OPTION_NAME[0])?.value, interaction.channelId);
        
        let reply = await NJDiscordReply.createFixedDiceMessage(NDDice).catch((e) => e.discordMessage);

        await wait(50);
        await interaction.editReply(reply);
    }
};

module.exports = ndf;