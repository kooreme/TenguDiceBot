/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const Log = require('../util/log');
const util = require('../util/util');
const Dice = require('./dice');
const ReceiveDiceRollInterface = require("./receiveDiceRollInterface");

const DICE_DIVIDE = /\+/g;
const COMMENT = /#/;
const MINUS = /-/g;

class DiceRoll extends ReceiveDiceRollInterface {
	constructor(string) {
		this.rawString = string;
		this.string = string ? string.replace(/\s+/g, '') : undefined;
		this.sumall = 0;
		this.comment;
		this.dice = [];
	}

	receiveDiceRoll() {
		return this.diceroll();
	}

	diceroll() {
		//コメントとダイスロール文字列を分離
		const searchComment = this.string.search(COMMENT);
		if (searchComment > 0) {
			this.comment = this.string.substring(searchComment + 1);
			this.string = this.string.substring(0, searchComment);
		}
		const diceStrArray = this.string.split(COMMENT);
		Log.prints('diceStrArray : ' + diceStrArray);

		const calcDiceStr = diceStrArray[0].replace(MINUS, '+-');

		const diceStr = calcDiceStr.split(DICE_DIVIDE);
		Log.prints('diceStr : ' + diceStr);

		diceStr.forEach((element) => {
			let newdice = new Dice(element);
			this.dice.push(newdice);
		});
		Log.printsDir(this.dice);

		_diceRoll(this.dice);
		for(const element of this.dice) {
			this.sumall += element.isMinus ? Number(element.sum) * -1 : Number(element.sum);
		}
		return this;
	}

}

module.exports = DiceRoll;



/**
 * _diceRoll
 * 全ダイスの数、面をチェックし、問題なければ全ダイスロールを行う。
 * */
function _diceRoll(dice) {
	if (dice == null) {
		Log.prints('Null Dice String');
		throw new Error('DiceRoll : Null Dice String');
	}
	let sumDiceMen = [];
	let sumDiceNum = 0;
	dice.forEach((element) =>{
		if (element == null) throw new Error('DiceRoll : Null Element String');

		sumDiceMen.push((element.diceMen == null) ? 0 : Number(element.diceMen));
		sumDiceNum += (element.diceNum == null) ? 0 : Number(element.diceNum);
	});

	Log.prints('sumDiceMen = ' + sumDiceMen + 'sumDiceMen.max = ' + Math.max.apply(null, sumDiceMen) + ', sumDiceNum = ' + sumDiceNum);
	//DiceRollクラス全体で制限を超えていないかチェック
	if (!util.checkSintax(sumDiceNum, Math.max.apply(null, sumDiceMen))) {
		throw new Error('DiceRoll : sintaxError');
	}
	else {
		dice.forEach((element) =>{
			element.diceRoll();
			Log.prints('diceRoll done.');
		});
	}
}

