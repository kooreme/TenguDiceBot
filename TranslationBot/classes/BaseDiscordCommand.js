/** @typedef {import('discord.js').ApplicationCommandData} ApplicationCommandData */
/** @typedef {import("discord.js").CommandInteraction} CommandInteraction */

/**
 * @class
 * コマンド定義を行うクラスの継承元です．
 */
class BaseDiscordCommand {
    /** @type {ApplicationCommandData} コマンド定義です． */
    command;

    constructor() {}

    /**
     * コマンドを実行する関数です．
     * @param {CommandInteraction} interaction コマンドインタラクションです．
     * @throws 関数が実装されていなければ，エラーを投げます．
     */
    async execute(interaction) {
        interaction;
        throw new Error("No Implement.");
    }
}
module.exports = BaseDiscordCommand;
