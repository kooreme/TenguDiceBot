const { setTimeout : wait } = require("timers/promises");
const DB = require("../classes/db");
const BaseDiscordCommand = require("../classes/BaseDiscordCommand");

const OPTION_NAME = ["to_channel"];

class DeleteOneChannel extends BaseDiscordCommand {
    command = {
        name : "delete-one-channel",
        description : "Deactivates one link of any channel that is linked to this channel.",
        options : [
            {
                type : "CHANNEL",
                name : OPTION_NAME[0],
                description : "Type any channel name.",
                required : true,
            },
        ],
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
        const options = {
            [OPTION_NAME[0]] : interaction.options.data[0],
        };
        const id = this.createId(interaction,options[OPTION_NAME[0]]);
        
        let reply = await this._deleteChannelPair(id,interaction)
        .catch((e) => {
            console.log(e);
            return "予期せぬエラーが発生しました。Bot管理者へ連絡してください。";
        });
        
        await wait(50);
        await interaction.editReply(reply);
    }

    createId(interaction,option) {
        const id = {
            to : option.channel.id,
            from : interaction.channelId,
        }
        return id;
    }

    async _deleteChannelPair(id,interaction) {

        const registable = this._checkRegistable(interaction);
        if (registable !== null) return registable;

        return await DB.deleteChannelPair(id.from,id.to)
        .then(() => `連携を解除しました。\n翻訳元： <#${id.from}>  翻訳先： <#${id.to}>`)
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



module.exports = new DeleteOneChannel();