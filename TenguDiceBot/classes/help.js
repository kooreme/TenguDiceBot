const ReceiveDiceRollInterface = require("./receiveDiceRollInterface");
class Help extends ReceiveDiceRollInterface {
    constructor(help) {
        super();
        this.help = help;
    }

    async receiveDiceRoll() {
        return this.help;
    }
}

module.exports = Help;