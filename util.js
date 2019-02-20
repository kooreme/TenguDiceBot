const Log = require('./log.js');

exports.ERROR_FLAG = 'Error';

exports.getRandomIntInclusive = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

exports.sum = function(arr) {
	Log.prints('arr : ' + arr);
    return arr.reduce(function(prev, current, i, arr) {
    	Log.prints('prev : ' +prev+ ' current : ' +current);
        return prev+current;
    });
};

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

