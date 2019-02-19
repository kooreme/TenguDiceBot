//dice.js
const COMMENT = /#/;
const DICE_DIVIDE = /\+/g;
const MINUS = /-(\d)/g;

const error = require('./errormessage.js');
const util = require('./util.js');
const Dice = require('./protodice.js');
/**
receiveDiceRoll
引数：String string ※メッセージ反応部はあらかじめ取り除くこと。
戻り値：String
ダイスロールメッセージを受信する。
*/
exports.receiveDiceRoll = function(string) {
    let returnString = '';

	//コメントとダイスロール文字列を分離
    const diceStrArray = string.split(COMMENT);
    const comment = diceStrArray[1] == null ? 'diceroll' : diceStrArray[1];
    console.log(diceStrArray);

    const calcDiceStr = diceStrArray[0].replace(MINUS,'+-$1');

    const diceStr = calcDiceStr.split(DICE_DIVIDE);
    console.log(diceStr);

    const dice = [];
    diceStr.forEach(function(element) {
    	dice.push(new Dice(element));
    });

    for(var i=0,l=dice.length;i<l;i++){

    	if (dice[i].result == dice[i].ERROR_FLAG) {
    		returnString = error.replyErrorMessage();
    		return returnString;
    	}
    }

    var sumall = 0;
    dice.forEach(function(element){
    	if (element.isMinus) {
    		returnString = returnString + ' - ' + element.toString();
    		sumall -= parseInt(element.sum,10);
    	} else {
    		returnString = returnString + ' + ' + element.toString();
    		sumall += parseInt(element.sum,10);
    	}
    	console.log('element.sum : ' + element.sum);
    	console.log('sumall : ' + sumall);
    });

    returnString = returnString.substring(3, returnString.length);
    returnString = comment + '：' + diceStrArray[0] + ' = ' + returnString + ' = ' + sumall;

    console.log(returnString);

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




