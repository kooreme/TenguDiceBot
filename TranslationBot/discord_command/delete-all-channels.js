const { setTimeout : wait } = require("timers/promises");
const DB = require("../classes/db");
const BaseDiscordCommand = require("../classes/BaseDiscordCommand");

class DeleteAllChannels extends BaseDiscordCommand {
    command = {
        name : "delete-all-channels",
        description : "Deactivates ALL channels that is linked to this channel.",
    };
    /**
    * 
    * @param {import("discord.js").CommandInteraction} interaction 
    * @returns 
    */
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        await interaction.deferReply();
        const {commandName} = interaction;

        const id = this.createId(interaction);
        
        let reply = await this._deleteChannelPair(id,interaction)
        .catch((e) => {
            console.log(e);
            return "予期せぬエラーが発生しました。Bot管理者へ連絡してください。";
        });
        
        await wait(50);
        await interaction.editReply(reply);
    }

    createId(interaction) {
        const id = {
            from : interaction.channelId,
        }
        return id;
    }

    async _deleteChannelPair(id,interaction) {

        const registable = this._checkRegistable(interaction);
        if (registable !== null) return registable;

        return await DB.deleteAllChannelPair(id.from)
        .then(() => `このチャンネルと連携する、全てのチャンネルの連携を解除しました。`)
        .catch((e) => {
            console.log(e);
            throw new Error();
        });
    }
    
    #NG_REASON = {
        FORBIDDEN : "チャンネルの連携操作は管理者以外禁止されています。"
    };
    _checkRegistable(interaction) {
        //登録NGガード
        //サーバー管理者以外禁止
        if (interaction.user.id !== interaction.guild.ownerId) return this.#NG_REASON.FORBIDDEN;

        //何もなければnullを返す。
        return null;
    }
};



module.exports = new DeleteAllChannels();