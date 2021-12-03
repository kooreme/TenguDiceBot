const { setTimeout : wait } = require("timers/promises");
const DB = require("../classes/db");
const trans = require("../classes/google-translation-v3");
const BaseDiscordCommand = require("../classes/BaseDiscordCommand");

const { TextChannel } = require("discord.js");

const OPTION_NAME = ["from_channel","from_language","to_channel","to_language"];

class RegistBetweenTwoChannels extends BaseDiscordCommand {
    command = {
        name : "regist-between-two-channels",
        description : "Register to translate what is said in any channel to another channel.",
        options : [
            {
                type : "CHANNEL",
                name : OPTION_NAME[0],
                description : "Type any channel name.",
                required : true,
            },
            {
                type : "STRING",
                name : OPTION_NAME[1],
                description : "https://bit.ly/3qDrFef Please specify one of the language codes on this page. e.g. ja",
                required : true,
            },
            {
                type : "CHANNEL",
                name : OPTION_NAME[2],
                description : "Type any channel name.",
                required : true,
            },
            {
                type : "STRING",
                name : OPTION_NAME[3],
                description : "https://bit.ly/3qDrFef Please specify one of the language codes on this page. e.g. en",
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
            [OPTION_NAME[1]] : interaction.options.data[1],
            [OPTION_NAME[2]] : interaction.options.data[2],
            [OPTION_NAME[3]] : interaction.options.data[3],
        };
        const id = this.createId(interaction,options);
        let fromLang = options[OPTION_NAME[1]].value;
        let toLang = options[OPTION_NAME[3]].value;
        
        let reply = await this._setChannelPair(id,fromLang,toLang,options,interaction)
        .catch((e) => {
            console.log(e);
            return "予期せぬエラーが発生しました。Bot管理者へ連絡してください。";
        });
        
        await wait(50);
        await interaction.editReply(reply);

        //idとlangをそれぞれ交換し、再度登録
        [fromLang, toLang] = [toLang, fromLang];
        [id.to, id.from] = [id.from, id.to];

        reply = await this._setChannelPair(id,fromLang,toLang,options,interaction)
        .catch((e) => {
            console.log(e);
            return "予期せぬエラーが発生しました。Bot管理者へ連絡してください。";
        });
        
        await wait(50);
        await interaction.followUp(reply);
    }

    createId(interaction,options) {
        const id = {
            interGuildId : interaction.guildId,
            toGuildId : options[OPTION_NAME[2]].channel.guildId,
            fromGuildId : options[OPTION_NAME[0]].channel.guildId,
            to : options[OPTION_NAME[2]].channel.id,
            from : options[OPTION_NAME[0]].channel.id,
        }
        return id;
    }


    async _setChannelPair(id,fromLang,toLang,options,interaction) {

        const registable = await this._checkRegistable(id,fromLang,toLang,options,interaction);
        if (registable !== null) return registable;

        return await DB.setChannelPair(id.from,id.to,fromLang,toLang,id.toGuildId)
        .then(() => `登録に成功しました。\n翻訳元： <#${id.from}>  翻訳先： <#${id.to}>  翻訳元言語：${fromLang} 翻訳先言語：${toLang}`)
        .catch((e) => {
            console.log(e);
            throw new Error();
        });
    }
    
    #NG_REASON = {
        NOT_SAME_GUILD :"同じサーバー内のチャンネルでないと連携できません。",
        SAME_CHANNEL : "同一チャンネルの登録は禁止しています。",
        REGESTED : "入力したチャンネルの連携はすでに登録されています。",
        NOT_SUPPORTED : "その言語コードはサポート対象外です。",
        NOT_TEXTCHANNEL : "テキストチャンネルでないチャンネルIDは登録できません。",
        FORBIDDEN : "チャンネルの連携操作は管理者以外禁止されています。"
    };
    async _checkRegistable(id,fromLang,toLang,options,interaction) {
        //登録NGガード
        //Guild違いを禁止
        if (id.toGuildId !== id.interGuildId) return this.#NG_REASON.NOT_SAME_GUILD;
        if (id.fromGuildId !== id.interGuildId) return this.#NG_REASON.NOT_SAME_GUILD;
        //同一チャンネルを禁止。
        if (id.to === id.from) return this.#NG_REASON.SAME_CHANNEL;
        //サーバー管理者以外禁止
        if (interaction.user.id !== interaction.guild.ownerId) return this.#NG_REASON.FORBIDDEN;
        //ChannelPairがすでに存在していたら終了。
        if (await DB.isExistChannelPair(id.from, id.to)) return this.#NG_REASON.REGESTED;
        //翻訳先言語が不正だったら中止。
        if (!(await trans.isTargetTranslatable(fromLang))) return this.#NG_REASON.NOT_SUPPORTED;
        if (!(await trans.isTargetTranslatable(toLang))) return this.#NG_REASON.NOT_SUPPORTED;
        //チャンネルのインスタンスがTextChannelでない場合は登録禁止。
        if (!(options[OPTION_NAME[0]].channel instanceof TextChannel)) return this.#NG_REASON.NOT_TEXTCHANNEL;
        if (!(options[OPTION_NAME[2]].channel instanceof TextChannel)) return this.#NG_REASON.NOT_TEXTCHANNEL;

        //何もなければnullを返す。
        return null;
    }
};

module.exports = new RegistBetweenTwoChannels();