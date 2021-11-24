const { setTimeout : wait } = require("timers/promises");
const DB = require("../classes/db");
const trans = require("../classes/google-translation-v3");
const BaseDiscordCommand = require("../classes/BaseDiscordCommand");

const { TextChannel } = require("discord.js");

const OPTION_NAME = ["from_language","to_channel","to_language"];

class registOneChannelTranslation extends BaseDiscordCommand {
    command = {
        name : "regist-one-channel-translation",
        description : "Register to translate what is said in this channel to another channel.",
        options : [
            {
                type : "STRING",
                name : OPTION_NAME[0],
                description : "https://bit.ly/3qDrFef Please specify one of the language codes on this page. e.g. ja",
                required : true,
            },
            {
                type : "CHANNEL",
                name : OPTION_NAME[1],
                description : "Type any channel name.",
                required : true,
            },
            {
                type : "STRING",
                name : OPTION_NAME[2],
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
        };

        const id = this.createId(interaction,options[OPTION_NAME[1]]);
        const fromLang = options[OPTION_NAME[0]].value;
        const toLang = options[OPTION_NAME[2]].value;
        
        let reply = await this._setChannelPair(id,fromLang,toLang,options[OPTION_NAME[1]].channel)
        .catch((e) => {
            console.log(e);
            return "予期せぬエラーが発生しました。Bot管理者へ連絡してください。";
        });
        
        await wait(50);
        await interaction.editReply(reply);
    }
    
    #NG_REASON = [
        "同じサーバー内のチャンネルでないと連携できません。",
        "同一チャンネルの登録は禁止しています。",
        "入力したチャンネルの連携はすでに登録されています。",
        "その言語コードはサポート対象外です。",
        "テキストチャンネルでないチャンネルIDは登録できません。"
    ];

    createId(interaction,option) {
        const id = {
            interGuildId : interaction.guildId,
            guildId : option.channel.guildId,
            to : option.channel.id,
            from : interaction.channelId,
        }
        return id;
    }

    async _setChannelPair(id,fromLang,toLang,channel) {
        //登録NGガード
        //Guild違いを禁止
        if (id.guildId !== id.interGuildId) return this.#NG_REASON[0];
        //同一チャンネルを禁止。
        if (id.to === id.from) return this.#NG_REASON[1];
        //ChannelPairがすでに存在していたら終了。
        if (await DB.isExistChannelPair(id.from, id.to)) return this.#NG_REASON[2];
        //翻訳先言語が不正だったら中止。
        if (!(await trans.isTargetTranslatable(fromLang))) return this.#NG_REASON[3];
        if (!(await trans.isTargetTranslatable(toLang))) return this.#NG_REASON[3];
        //チャンネルのインスタンスがTextChannelでない場合は登録禁止。
        if (!(channel instanceof TextChannel)) return this.#NG_REASON[4];
    
        return await DB.setChannelPair(id.from,id.to,fromLang,toLang,id.guildId)
        .then(() => `登録に成功しました。\n翻訳元： <#${id.from}>  翻訳先： <#${id.to}>  翻訳元言語：${fromLang} 翻訳先言語：${toLang}`)
        .catch((e) => {
            console.log(e);
            throw new Error();
        });
    }
};



module.exports = new registOneChannelTranslation();