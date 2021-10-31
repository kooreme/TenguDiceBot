const CTCommand = require('../TenguDiceBot/ct_command/ctcommand');

const OPTION_NAME = ["commands"]
const ct = {
    command : {
        name : "ct",
        description : "独自の効果表を作成することができます。",
        options : [
            {
                type : "STRING",
                name : OPTION_NAME[0],
                description : "コマンドの一覧を見る場合は「help」と入力してください。",
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

        const guild = await interaction.client.guilds.fetch({ guild: interaction.guildId , force: true});

        const ids = {
            channelId : interaction.channelId,
            authorId : interaction.user.id,
            guildOwnerId : guild.ownerId,
        }
        //await interaction.editReply("テスト中");
        const replacedCommand = String(interaction.options.get(OPTION_NAME[0])?.value).replace(/\<br\>/g,"\n");
        
        const reply = await CTCommand.run(replacedCommand,ids)
        .catch((e) => "予期せぬエラーが発生しました。Bot管理者へ連絡してください。\n" + e) ;
        //通常はリプライ
        if(typeof reply === 'string') interaction.editReply(reply);
        //文字数が多く、１回で表示しきれない場合は複数回に分け、sendする。
        //checktablelist,checktabledataがこれになりそう。
        else {
            for (let i = 0; i < reply.length; i++) {
                if (i === 0) await interaction.editReply(reply[i]);
                else await interaction.followUp(reply[i]);
            }
        }
        
    }
        
};

module.exports = ct;