const NDDiceRoll = require("./nd_diceroll");
const Help = require('./help');
const WasshoiDiceRoll = require('./wasshoi');

const WASSHOI = /^wasshoi\d+$/i;
const SEISEN = /^seisen\d+$/i
const HELP = /^help$/;

/**
diceRollHandler
引数：String string ※メッセージ反応部はあらかじめ取り除くこと。
      message message Discordのmessageオブジェクト
戻り値：DiceRoll
作成するべきDiceRollオブジェクトを決定する。
*/

function diceRollHandler(string,message) {

    if (HELP.test(string)) return new Help();
    if (WASSHOI.test(string)) return new WasshoiDiceRoll(string, WasshoiDiceRoll.KIND.WASSHOI);
    if (SEISEN.test(string)) return new WasshoiDiceRoll(string, WasshoiDiceRoll.KIND.SEISEN);
    else return new NDDiceRoll(string,message);
}

module.exports = diceRollHandler;