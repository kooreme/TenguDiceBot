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