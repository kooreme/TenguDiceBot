const Log = require('./log.js');
const error = require('./errormessage.js');
const Dice = require('./protodice.js');


const DICE_DIVIDE = /\+/g;
const COMMENT = /#/;
const MINUS = /-/g;
const SPACE_PLUS_SPACE = ' + ';

exports.ERROR_FLAG = 'Error';
exports.EVERY_APPENDIX = /(\[.*\]$)/;

/**
 * 最小～最大（最大含む）の整数をランダムに返す。
 * */
exports.getRandomIntInclusive = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

/**
 * 配列の数値を合計する。
 * */
exports.sum = function(arr) {
	Log.prints('arr : ' + arr);
    return arr.reduce(function(prev, current, i, arr) {
    	Log.prints('prev : ' +prev+ ' current : ' +current);
        return prev+current;
    });
};

/**
 * ダイス面、ダイス数が制限を超えていないかチェックする。
 * 複数のダイスがある場合はあらかじめダイス数、ダイス面を合計してから渡すこと。
 * */
exports.checkSintax = function (diceNum,diceMen) {
	if(isNaN(diceNum) || isNaN(diceMen)) {
		return false;
	}
	var keta = String(diceMen).length;
	if (0 >= diceNum || 0>= diceMen || diceNum > 900 || diceMen > 100000 || diceNum *(keta+1) > 1900) {
		return false;
	}

	return true;

};

/**
 * diceRoll
 * 全ダイスの数、面をチェックし、問題なければ全ダイスロールを行う。
 * */
exports.diceRoll = function(dice){
	if (dice == null) {
		Log.prints('Null Dice String');
		throw new Error('Null Dice String');
	}
    var sumDiceMen = [];
    var sumDiceNum = 0;
    dice.forEach(function(element){
		if (element == null) {
			Log.prints('Null Element String');
			throw new Error('Null Element String');
		}
    	sumDiceMen.push((element.diceMen == null) ? 0 : Number(element.diceMen));
    	sumDiceNum += (element.diceNum == null) ? 0 : Number(element.diceNum);
    });
    Log.prints('sumDiceMen = ' + sumDiceMen +'sumDiceMen.max = ' + Math.max.apply(null, sumDiceMen) + ', sumDiceNum = ' + sumDiceNum);
    if (!exports.checkSintax(sumDiceNum,Math.max.apply(null, sumDiceMen))) {
    	Log.prints('sintaxError');
		throw new Error('sintaxError');
    }
    else {
    	dice.forEach(function(element){
    		element.diceRoll();
    		Log.prints('diceRoll done.');
    	});
	}
};

exports.createOutput = function(dice,comment) {
	let str = '';
	let sumall = 0;
	let diceStr = '';
    dice.forEach(function(element){
    	if (element.isMinus) {
    		str = str + ' - ' + element.toString();
			sumall -= parseInt(element.sum,10);
			diceStr = diceStr + '-' + element.string;
    	} else {
    		str = str + ' + ' + element.toString();
			sumall += parseInt(element.sum,10);
			diceStr = diceStr + '+' + element.string;
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

};

exports.normalDiceRoll = function (string) {
    let returnString = '';

    let comment = '';
	//コメントとダイスロール文字列を分離
    const searchComment = string.search(COMMENT);
    if (searchComment > 0) {
    	comment = string.substring(searchComment+1);
    	string = string.substring(0,searchComment);
    }
    const diceStrArray = string.split(COMMENT);
    Log.prints('diceStrArray : ' + diceStrArray);

    const calcDiceStr = diceStrArray[0].replace(MINUS,'+-');

    const diceStr = calcDiceStr.split(DICE_DIVIDE);
    Log.prints('diceStr : ' + diceStr);

    const dice = [];
    diceStr.forEach(function(element) {
		let newdice = new Dice(element);
		if (newdice.result == exports.ERROR_FLAG) {
			Log.prints('Error Dice!');
    		dice.push (null);
		}
		else {
			dice.push(newdice);
		}
	});
	Log.printsDir(dice);

	//ダイスロール
	try {
	    exports.diceRoll(dice);
		return {dice: dice, comment: comment};
	}
	catch (e) {
		return null;
	}
}


exports.sort = function(resArray) {
	resArray.sort(function(a,b){
        if( a < b ) return -1;
        if( a > b ) return 1;
        return 0;
	});
	return resArray;
}