const Record = require("../tengu_bank/record");
const { setTimeout : wait } = require("timers/promises");

const OPTION_NAME = ["command"];

const tb = {
    command: {
        name : "tb",
        description : "天狗銀行への預け入れ/引き出しを行います。",
        options : [
            {
                type : "STRING",
                name : OPTION_NAME[0],
                description : "コマンドの詳細はnoteを確認してください。",
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
        let reply = await Record.receiveResponce(option, interaction.channelId)
        .catch(() => "予期せぬエラーが発生しました。Bot管理者へ連絡してください。");
        
        await wait(50);
        await interaction.editReply("`/" + commandName + " " + option + "`\n" + reply);
    }
};

module.exports = tb;