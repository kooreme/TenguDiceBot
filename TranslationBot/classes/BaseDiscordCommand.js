/**
 * コマンド定義を行うクラスの継承元です．
 */
class BaseDiscordCommand {
    command;
    constructor() {}
    async execute() {
        throw new Error("No Implement.");
    }
}
module.exports = BaseDiscordCommand;
