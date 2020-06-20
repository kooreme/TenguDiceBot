//const util = require('./util.js');
const Dice = require('./dice.js');
const Log = require('./log.js');

const WasshoiMessage = '\n\n:japanese_goblin: 「今だ、ニンジャスレイヤー＝サン！」\n\n**「Wasshoi!」**';
const SeisenMessage = '\n\n:japanese_goblin: **「……神々の使者、ヤクザ天狗参上！」** :japanese_goblin:';
/**
 * Wasshoi!専用処理
 * 引数：DKK（正の整数）,mes（ひみつのキーワード）
 */
exports.wasshoiDiceRoll = function(dkk,mes) {
	let isSeisen = mes === '893';
	Log.prints('wasshoiDiceRoll : string :' + dkk);
	const dice = new Dice.Dice('2d6');
	dice.diceRoll();

	let returnString = (isSeisen ? '聖戦判定!' : 'Wasshoi!判定!') + ' = ' + dice.toString() + ' = ' + dice.sum + '<=' + dkk + '  判定';
	returnString += (dice.sum <= Number(dkk))
	? '成功！' + (isSeisen ? SeisenMessage : WasshoiMessage)
	: '失敗';

	return returnString;
}
