const NDDiceRoll = require("./nd_diceroll");
const WasshoiDiceRoll = require('./wasshoi');
const help = require("./help");
const tableHelp = require("./tablehelp");

const WASSHOI = /^wasshoi\d+$/i;
const SEISEN = /^seisen\d+$/i
const HELP = /^help$/i;
const TABLEHELP = /^tablehelp$/i;

/**
diceRollHandler
引数：String string ※メッセージ反応部はあらかじめ取り除くこと。
      channelID 発言されたチャンネルのID
戻り値：DiceRoll
作成するべきDiceRollオブジェクトを決定する。
*/

function diceRollHandler(string,channelID) {

    if (HELP.test(string)) return help;
    if (TABLEHELP.test(string)) return tableHelp;
    if (WASSHOI.test(string)) return new WasshoiDiceRoll(string, WasshoiDiceRoll.KIND.WASSHOI);
    if (SEISEN.test(string)) return new WasshoiDiceRoll(string, WasshoiDiceRoll.KIND.SEISEN);
    else return new NDDiceRoll(string,channelID);
}

module.exports = diceRollHandler;