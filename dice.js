//dice.js

/**
receiveDiceRoll
引数：String string ※メッセージ反応部はあらかじめ取り除くこと。
戻り値：String
ダイスロールメッセージを受信する。
*/
exports.receiveDiceRoll = function(string) {
    var str = diceRoll(5,6).join(',');
    return 'diceroll! : (' + str + ')';
//    return 'I received ' + '"' + string + '"';
};

function diceRoll(sum, diceMen) {
    var result = [];
    for(i = 0;i < sum;i++) {
        result.push(getRandomIntInclusive(1,diceMen));
    }
    return result;
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};
