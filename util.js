const Log = require('./log.js');

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
