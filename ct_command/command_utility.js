exports.checkInvalidChar = function(str) {
    return (/[0-9a-zA-Z#[\]()'`",.\\/\b\f\n\r\t\x20\u3000]/.test(str) && str.length >= 4);
}

exports.checkFlagString = function(str) {
    return /^[tTfF]$/.test(str);
}

exports.isT = function(str) {
    return /^[tT]$/.test(str);
}