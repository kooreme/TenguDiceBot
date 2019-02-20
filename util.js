const Log = require('./log.js');

exports.ERROR_FLAG = 'Error';

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

}

