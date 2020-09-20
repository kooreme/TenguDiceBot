const Log = require('../log');

exports.checkInvalidChar = function(str) {
    const test = /[0-9a-zA-Z#[\]()'`",.\\/\b\f\n\r\t\x20\u3000]/.test(str);
    if (test || str.length < 4) return true;
    else return false;
}
exports.checkInvalidCharForDice = function(str) {
    if (/[#[\]()'`",.\\/\b\f\n\r\t\x20\u3000]/.test(str)) return true;
    else return false;
}

exports.checkFlagString = function(str) {
    return /^[tTfF]$/.test(str);
}

exports.isT = function(str) {
    return /^[tT]$/.test(str);
}

exports.checkDataRange = function(userTable) {
    const range = {"max" : Number.MAX_SAFE_INTEGER, "min" : Number.MIN_SAFE_INTEGER};
    if (!userTable.data) return range;

    const keys = Object.keys(userTable.data);
    const dataSize = keys.length;

    if (dataSize === 0) return range;
    for (let key of keys) {
        const keyNum = Number(key);
        range.max = range.max === Number.MAX_SAFE_INTEGER ? keyNum : Math.max(keyNum,Number(range.max));
        range.min = range.min === Number.MIN_SAFE_INTEGER ? keyNum : Math.min(keyNum,Number(range.min));
    }

    Log.prints('range = ' + JSON.stringify(range))
    return range;
}