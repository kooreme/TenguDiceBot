const Log = require('./log.js');
const error = require("./errormessage");

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
    return arr.reduce(function(prev, current) {
	Log.prints('prev : ' +prev+ ' current : ' +current);
        return prev+current;
    });
};



exports.sort = function(resArray) {
	resArray.sort(function(a,b){
        if( a < b ) return -1;
        if( a > b ) return 1;
        return 0;
	});
	return resArray;
}

/**
 * ダイス面、ダイス数が制限を超えていないかチェックする。
 * 複数のダイスがある場合はあらかじめダイス数、ダイス面を合計してから渡すこと。
 * */
exports.checkSintax = function (diceNum,diceMen) {
	if(isNaN(diceNum) || isNaN(diceMen)) {
		return false;
	}
	var keta = String(diceMen).length;
	if (0 > diceNum || 0 > diceMen || diceNum > 900 || diceMen > 100000 || diceNum *(keta+1) > 1900) {
		return false;
	}
	return true;
};

exports.spellCheck = function(string) {
	if (/#/.test(string)) return string.replace(/[！!表・](?=.*?#)/g, '');
	else return string.replace(/[！!表・]/g, '');
}

exports.isSendableMessage = function(string, err = error) {
	let str = string;
    if (str.length >= 2000) {
        Log.prints('文字数制限オーバー（2000字）');
        str = err.replyErrorMessage() + '\n（文字数制限をオーバーしました。振るダイスの発言を分割してください）';
    }
	return str;
}