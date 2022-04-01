const NDDiceRoll = require("./nd_diceroll");
const WasshoiDiceRoll = require('./wasshoi');
const help = require("./help");
const tableHelp = require("./tablehelp");
const Help = require("../classes/help");

const HELP = /^help$/i;
const TABLEHELP = /^tablehelp$/i;

/**
 * 作成するべきDiceRollオブジェクトを決定する。
 * @exports
 * @param {string} string ※メッセージ反応部はあらかじめ取り除くこと。
 * @param {import("discord.js").Snowflake} channelID
 * @returns {NDDiceRoll|Help} NDDiceRollクラス、または説明用インターフェースを実装したクラス
*/

function diceRollHandler(string,channelID) {

    if (HELP.test(string)) return help;
    if (TABLEHELP.test(string)) return tableHelp;
    if (WasshoiDiceRoll.KIND.WASSHOI.kindRegExp.test(string)) return new WasshoiDiceRoll(string, WasshoiDiceRoll.KIND.WASSHOI);
    if (WasshoiDiceRoll.KIND.SEISEN.kindRegExp.test(string)) return new WasshoiDiceRoll(string, WasshoiDiceRoll.KIND.SEISEN);
    else return new NDDiceRoll(string,channelID);
}

module.exports = diceRollHandler;