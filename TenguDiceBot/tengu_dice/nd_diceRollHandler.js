const NDDiceRoll = require("./nd_diceroll");
const WasshoiDiceRoll = require('./wasshoi');
const help = require("./help");
const tableHelp = require("./tablehelp");
const Help = require("../classes/help");

const WASSHOI = /^wasshoi\d+$/i;
const SEISEN = /^seisen\d+$/i
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
    if (WASSHOI.test(string)) return new WasshoiDiceRoll(string, WasshoiDiceRoll.KIND.WASSHOI);
    if (SEISEN.test(string)) return new WasshoiDiceRoll(string, WasshoiDiceRoll.KIND.SEISEN);
    else return new NDDiceRoll(string,channelID);
}

module.exports = diceRollHandler;