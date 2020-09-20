//const util = require('../util/util');
const Dice = require('../classes/dice');

const WasshoiMessage = '\n\n:japanese_goblin: 「今だ、ニンジャスレイヤー＝サン！」\n\n**「Wasshoi!」**';
const SeisenMessage = '\n\n:japanese_goblin: **「……神々の使者、ヤクザ天狗参上！」** :japanese_goblin:';
/**
 * Wasshoi!専用処理
 * 引数：DKK（正の整数）,mes（ひみつのキーワード）
 */
exports.wasshoiDiceRoll = function(dkk) {
	return _specialDiceRoll(dkk,'Wasshoi!判定',WasshoiMessage);
}

exports.seisenDiceRoll = function(dkk) {
	return _specialDiceRoll(dkk,'聖戦判定',SeisenMessage);
}

function _specialDiceRoll(dkk,judgeName,successMessage) {
	const dice = new Dice.Dice('2d6');
	dice.diceRoll();
	let returnString = judgeName + '!' + ' = ' + dice.toString() + ' = ' + dice.sum + '<=' + dkk + '  判定';
	returnString += (dice.sum <= Number(dkk))
	? '成功！' + successMessage
	: '失敗';

	return returnString;
}
