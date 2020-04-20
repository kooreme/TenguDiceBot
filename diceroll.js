const error = require('./errormessage');
const Log = require('./log');
const util = require('./util.js');
const Dice = require('./dice.js');
const DB = require('./db');

const SPACE_PLUS_SPACE = ' + ';
const DICE_DIVIDE = /\+/g;
const COMMENT = /#/;
const MINUS = /-/g;

class DiceRoll {
	constructor(string, datatable, message) {
		this.rawString = string;
		this.datatable = datatable;
		this.message = message;
		this.string = string.replace(/\s+/g, '');
	}

	receiveDiceRoll() {
		return this.normalDiceRoll();
	}

	//サブクラスで実装
	normalDiceRoll() {
		let comment = '';
		//コメントとダイスロール文字列を分離
		const searchComment = this.string.search(COMMENT);
		if (searchComment > 0) {
			comment = this.string.substring(searchComment + 1);
			this.string = this.string.substring(0, searchComment);
		}
		const diceStrArray = this.string.split(COMMENT);
		Log.prints('diceStrArray : ' + diceStrArray);

		const calcDiceStr = diceStrArray[0].replace(MINUS, '+-');

		const diceStr = calcDiceStr.split(DICE_DIVIDE);
		Log.prints('diceStr : ' + diceStr);

		const dice = [];
		diceStr.forEach(function (element) {
			let newdice = new Dice.Dice(element);
			if (newdice.result == util.ERROR_FLAG) {
				Log.prints('Error Dice!');
				dice.push(null);
			}
			else {
				dice.push(newdice);
			}
		});
		Log.printsDir(dice);

		//ダイスロール
		try {
			diceRoll(dice);
			return { dice: dice, comment: comment };
		}
		catch (e) {
			return null;
		}
	}


	//サブクラスで必要に応じて実装
	shortcutTransration(string) {
		return string;
	}

	receiveFixedMessage() {
		const stringArray = this.string.split('#');

		stringArray[0] = this.spellCheck(stringArray[0]);
		Log.prints(stringArray);
		return FixedOutputMessage(stringArray, this.message);
	}

	spellCheck(string) {
		return util.spellCheck(string);
	}

	createOutput(dice, comment) {
		let str = '';
		let sumall = 0;
		let diceStr = '';
		dice.forEach(function (element) {
			if (element.isMinus) {
				str = str + ' - ' + element.toString();
				sumall -= parseInt(element.sum, 10);
				diceStr = diceStr + '-' + element.trancedString;
			} else {
				str = str + ' + ' + element.toString();
				sumall += parseInt(element.sum, 10);
				diceStr = diceStr + '+' + element.trancedString;
			}
			Log.prints('element.sum : ' + element.sum);
			Log.prints('sumall : ' + sumall);
		});

		//先頭3文字（' + '）を除去
		str = str.substring(SPACE_PLUS_SPACE.length, str.length);
		diceStr = diceStr.substring('+'.length, diceStr.length);
		str = comment + '：`' + diceStr + '` = ' + str + ' = ' + sumall;

		if (str.length >= 2000) {
			Log.prints('文字数制限オーバー（2000字）');
			str = error.replyErrorMessage() + '\n（2000文字制限オーバーです。分割してください）';
		}

		return str;

	}
}

module.exports.DiceRoll = DiceRoll;

function FixedOutputMessage(array, message) {
	let returnString = '';
	//データベースからの取得。private -> public -> defaultの順で検索。
	let checkDataTable = DB.db.getUserTable(message.channel.id, array[0].toLowerCase());
	if (!checkDataTable) checkDataTable = DB.db.getUserTable(null, array[0].toLowerCase());
	if (!checkDataTable) checkDataTable = DB.db.getDefaultTable(DB.db.ND_DATATABLE, array[0].toLowerCase());


	if (checkDataTable && array[1] != null && (!isNaN(array[1])) && checkDataTable.data[array[1]] != null) {
		returnString = '\n\n' + checkDataTable.data[array[1]];
	}
	else {
		returnString = error.replyErrorMessage();
	}
	return returnString;
}

/**
 * diceRoll
 * 全ダイスの数、面をチェックし、問題なければ全ダイスロールを行う。
 * */
function diceRoll(dice) {
	if (dice == null) {
		Log.prints('Null Dice String');
		throw new Error('Null Dice String');
	}
	var sumDiceMen = [];
	var sumDiceNum = 0;
	dice.forEach(function (element) {
		if (element == null) {
			Log.prints('Null Element String');
			throw new Error('Null Element String');
		}
		sumDiceMen.push((element.diceMen == null) ? 0 : Number(element.diceMen));
		sumDiceNum += (element.diceNum == null) ? 0 : Number(element.diceNum);
	});
	Log.prints('sumDiceMen = ' + sumDiceMen + 'sumDiceMen.max = ' + Math.max.apply(null, sumDiceMen) + ', sumDiceNum = ' + sumDiceNum);
	if (!util.checkSintax(sumDiceNum, Math.max.apply(null, sumDiceMen))) {
		Log.prints('sintaxError');
		throw new Error('sintaxError');
	}
	else {
		dice.forEach(function (element) {
			element.diceRoll();
			Log.prints('diceRoll done.');
		});
	}
}

