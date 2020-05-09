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
    //データ未登録なら巨大数をセットしておく。
    if (!userTable.data || userTable.data.size === 0) return {"max" : Number.MAX_SAFE_INTEGER, "min" : Number.MIN_SAFE_INTEGER};
    const keys = userTable.data.keys();
    let range = userTable.datarange ? userTable.datarange : {"max" : Number.MAX_SAFE_INTEGER, "min" : Number.MIN_SAFE_INTEGER};
    for (let key of keys) {
        range.max = range.max === Number.MAX_SAFE_INTEGER ? key : Math.max(key,Number(range.max));
        range.min = range.min === Number.MIN_SAFE_INTEGER ? key : Math.min(key,Number(range.min));
    }

    return range;
}