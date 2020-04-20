//const util = require('./util.js');
const Dice = require('./dice.js');
const Log = require('./log.js');

const WasshoiMessage = '\n\n:japanese_goblin: 「今だ、ニンジャスレイヤー＝サン！」\n\n**「Wasshoi!」**';
/**
 * Wasshoi!専用処理
 * 引数：DKK（正の整数）
 */
exports.wasshoiDiceRoll = function(dkk) {
	Log.prints('wasshoiDiceRoll : string :' + dkk);
	var dice = new Dice('2d6');
	dice.diceRoll();

	var returnString = 'Wasshoi!判定! = ' + dice.toString() + ' = ' + dice.sum + '<=' + dkk + '  判定';
	returnString += (dice.sum <= Number(dkk))
	? '成功！' + WasshoiMessage
	: '失敗';

	return returnString;
}
