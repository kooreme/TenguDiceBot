//dice.js
const COMMENT = /(#)/;
const DICE_ROLL = /^\d*?d\d+?/;

const error = require('./errormessage.js');
const util = require('./util.js');
const ERROR_FLAG = 'Error';
/**
receiveDiceRoll
引数：String string ※メッセージ反応部はあらかじめ取り除くこと。
戻り値：String
ダイスロールメッセージを受信する。
*/
exports.receiveDiceRoll = function(string) {
    var diceStrArray = string.split(COMMENT);
    console.log(diceStrArray);
    var str = checkDiceSentence(diceStrArray[0]);

    var returnString = '';
    if (str != ERROR_FLAG) {
    	returnString = (diceStrArray[2] == null)
    	? 'diceroll!：' + diceStrArray[0] + ' = ' + str
    			: diceStrArray[2] + '：' + diceStrArray[0] + ' = ' + str;
    }
    else {
    	returnString = error.replyErrorMessage();
    }
    return returnString;
};


function checkDiceSentence(string) {
    var result = '';
    //基本ダイスロール
    if (DICE_ROLL.test(string)) {
        var splits = string.split(/([dp])/);
        console.log('checkDiceSentence = ' + splits);

        if(!isNaN(splits[2])) {
//            if(splits[3] == null) {
//                splits.push('');
//            }
            var resArray = diceRoll(splits[0],splits[2]);

            switch(splits[3]) {
            case 'p' :
                result = '(' + resArray.join('+') + ') = ' + util.sum(resArray);
                break;

            default :
                result = '(' + resArray.join(',') + ')';
                break;
            }
        }
    }

    else {
        console.log('Error: string = ' + string);
        result = ERROR_FLAG;
    }

    return result;
}

function diceRoll(number, diceMen) {
    var result = [];
    for(i = 0;i < number;i++) {
        result.push(util.getRandomIntInclusive(1,diceMen));
    }
    return result;
};


