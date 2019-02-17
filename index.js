const eris = require("eris");

// botトークンのIDをTOKEN_IDに入力します
var bot = new eris("NTQ2NjYxOTcyNDk4ODQxNjAx.D0reoQ.seZtxKmg5aPUHJ5HjysmXjujgcA");

bot.on("ready", () => {
    console.log("botの準備が完了しました");
});

// Discordに接続します
bot.connect();