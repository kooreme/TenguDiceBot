const { setTimeout: wait } = require("timers/promises");
const DB = require("../classes/db");
const BaseDiscordCommand = require("../classes/BaseDiscordCommand");
/** @typedef {import("discord.js").CommandInteraction} CommandInteraction */
/** @typedef {import("discord.js").CommandInteractionOption} CommandInteractionOption */

const OPTION_NAME = ["to_channel"];

/**
 * @class
 * コマンド `delete-all-channels` を扱うクラスです．
 */
class DeleteOneChannel extends BaseDiscordCommand {
    command = {
        name: "delete-one-channel",
        description:
            "Deactivates one link of any channel that is linked to this channel.",
        options: [
            {
                type: "CHANNEL",
                name: OPTION_NAME[0],
                description: "Type any channel name.",
                required: true,
            },
        ],
    };

    /**
     * コマンドを実行する関数です．
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        await interaction.deferReply();
        const options = {
            [OPTION_NAME[0]]: interaction.options.data[0],
        };
        const id = this.createId(interaction, options[OPTION_NAME[0]]);

        let reply = await this._deleteChannelPair(id, interaction).catch(
            (e) => {
                console.log(e);
                return "予期せぬエラーが発生しました。Bot管理者へ連絡してください。";
            }
        );

        await wait(50);
        await interaction.editReply(reply);
    }

    /**
     * クエリに用いるIDを返します．
     * @private
     * @param {CommandInteraction} interaction
     * @param {CommandInteractionOption} option
     * @returns クエリに用いるchannelIdを含むオブジェクトです．
     */
    createId(interaction, option) {
        const id = {
            to: option.channel.id,
            from: interaction.channelId,
        };
        return id;
    }

    /**
     * コマンド実行者の権限を確認し，実際に連携を解除します．
     * @private
     * @param {{ from: string, to: string }} id クエリに用いる情報です．
     * @param {CommandInteraction} interaction
     * @returns 結果を返す文字列です．
     * @throws データベースでエラーがあった場合，空のエラーを投げます．
     */
    async _deleteChannelPair(id, interaction) {
        const registable = this._checkRegistable(interaction);
        if (registable !== null) return registable;

        return await DB.deleteChannelPair(id.from, id.to)
            .then(
                () =>
                    `連携を解除しました。\n翻訳元： <#${id.from}>  翻訳先： <#${id.to}>`
            )
            .catch((e) => {
                console.log(e);
                throw new Error();
            });
    }

    #NG_REASON = {
        FORBIDDEN: "チャンネルの連携操作は管理者以外禁止されています。",
    };

    /**
     * コマンド実行者の権限を確認します．
     * @private
     * @param {CommandInteraction} interaction
     * @returns {?string} 権限があればnullを，権限がなければエラーメッセージを返します．
     */
    _checkRegistable(interaction) {
        //登録NGガード
        //サーバー管理者以外禁止
        if (interaction.user.id !== interaction.guild.ownerId)
            return this.#NG_REASON.FORBIDDEN;

        //何もなければnullを返す。
        return null;
    }
}

module.exports = new DeleteOneChannel();
