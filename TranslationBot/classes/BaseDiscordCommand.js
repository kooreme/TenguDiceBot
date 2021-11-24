class BaseDiscordCommand {
    command;
    constructor() {}
    async execute() {
        throw new Error("No Implement.");
    }
}
module.exports = BaseDiscordCommand;