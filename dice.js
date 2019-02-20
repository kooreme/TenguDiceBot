//dice.js
const COMMENT = /#/;
const DICE_DIVIDE = /\+/g;
const MINUS = /(\d)-/g;
const DICE_ROLL = /^\d*[dD]\d+/;
const SHORT_CUT_COMMAND = /^[kenhu]\d+(?:,\d+)*/i;
const WASSHOI = /^wasshoi\d+$/i;

const wasshoi = require('./wasshoi.js');
const error = require('./errormessage.js');
const util = require('./util.js');
const Dice = require('./protodice.js');
const Log = require('./log.js');

const STRING_WASSHOI = 'wasshoi';
const SPACE_PLUS_SPACE = ' + ';

/**
receiveDiceRoll
引数：String string ※メッセージ反応部はあらかじめ取り除くこと。
戻り値：String
ダイスロールメッセージを受信する。
*/
exports.receiveDiceRoll = function(string) {
    //スペースを除去
    string = string.replace(/\s+/g, '');

    if (WASSHOI.test(string)) {
    	return wasshoi.wasshoiDiceRoll(string.substring(STRING_WASSHOI.length));
    }

    //通常ダイスロール
    return normalDiceRoll(string);

};

function normalDiceRoll(string) {
    let returnString = '';

	//ショートカットコマンドを翻訳する
    string = shortcutTransration(string);

    let comment = '';
	//コメントとダイスロール文字列を分離
    const searchComment = string.search(COMMENT);
    if (searchComment > 0) {
    	comment = string.substring(searchComment+1);
    	string = string.substring(0,searchComment);
    }
    const diceStrArray = string.split(COMMENT);
//    const comment = diceStrArray[1] == null ? 'diceroll' : diceStrArray[1];
    Log.prints('diceStrArray : ' + diceStrArray);

    const calcDiceStr = diceStrArray[0].replace(MINUS,'$1+-');

    const diceStr = calcDiceStr.split(DICE_DIVIDE);
    Log.prints('diceStr : ' + diceStr);

    const dice = [];
    diceStr.forEach(function(element) {
    	dice.push(new Dice(element));
    });

    for(var i=0,l=dice.length;i<l;i++){

    	if (dice[i].result == util.ERROR_FLAG) {
    		returnString = error.replyErrorMessage();
    		return returnString;
    	}
    }

    //ダイスロール
    if(diceRoll(dice)== false) {
		returnString = error.replyErrorMessage();
		return returnString;
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
    	Log.prints('element.sum : ' + element.sum);
    	Log.prints('sumall : ' + sumall);
    });

    //先頭3文字（' + '）を除去
    returnString = returnString.substring(SPACE_PLUS_SPACE.length, returnString.length);
    returnString = comment + '：`' + diceStrArray[0] + '` = ' + returnString + ' = ' + sumall;

    if (returnString.length >= 2000) {
    	Log.prints('文字数制限オーバー（2000字）');
    	returnString = error.replyErrorMessage() + '\n（2000文字制限オーバーです。分割してください）';
    }
    Log.prints('returnString : ' + returnString);

    return returnString;
}

/**
 * shortcutTransration
 * ショートカット記法を翻訳し、文字列を返す。
 * */
function shortcutTransration(string) {
	var splits = string.split(/([\#\+\-])/);
	Log.prints('shortcutTransration : splits :' + splits);
	var returnString = '';
	var shortcutArray = [];
	for(var i=0,l=splits.length;i<l;i++) {
		var optionString = '';
		if (SHORT_CUT_COMMAND.test(splits[i])) {
			var shortcut = splits[i].split(/([kenhu,])/);

			for(var k=0,m=shortcut.length;k<m;k++) {
				Log.prints('shortcutTransration shortcut[' + k + '] : ' + shortcut[k]);

				if(k == 1 && /[kenhu]/i.test(shortcut[k])) {
					switch(shortcut[k]) {
					case 'k' :
					case 'K' :
						optionString = '>=2';
						break;
					case 'e' :
					case 'E' :
						optionString = '>=3';
						break;
					case 'n' :
					case 'N' :
						optionString = '>=4';
						break;
					case 'h' :
					case 'H' :
						optionString = '>=5';
						break;
					case 'u' :
					case 'U' :
						optionString = '=6';
						break;
					default:
						returnString = util.ERROR_FLAG;
						continue;
					}
				}

				else if (/\d+/.test(shortcut[k])) {
					shortcutArray.push(shortcut[k]+'d6'+optionString);
				}
				else if (shortcut[k] != ',' && shortcut[k] != '') {
					return util.ERROR_FLAG;
				}
			}
		}
		else if (splits[i] == '+') {
			continue;
		}
		else {
			shortcutArray.push(splits[i]);
		}
	}
	returnString = shortcutArray.join('+');
	returnString = returnString.replace(/\+-\+/g, '-');
	returnString = returnString.replace(/\+#\+/g, '#');

	Log.prints('shortcutTransration returnString : ' + returnString);
	return returnString;
}

/**
 * diceRoll
 * 全ダイスの数、面をチェックし、問題なければ全ダイスロールを行う。
 * */
function diceRoll (dice){
    var sumDiceMen = [];
    var sumDiceNum = 0;
    dice.forEach(function(element){
    	sumDiceMen.push((element.diceMen == null) ? 0 : Number(element.diceMen));
    	sumDiceNum += (element.diceNum == null) ? 0 : Number(element.diceNum);
    });
    Log.prints('sumDiceMen = ' + sumDiceMen +'sumDiceMen.max = ' + Math.max.apply(null, sumDiceMen) + ', sumDiceNum = ' + sumDiceNum);
    if (!util.checkSintax(sumDiceNum,Math.max.apply(null, sumDiceMen))) {
    	Log.prints('sintaxError');
		return false;
    }
    else {
    	dice.forEach(function(element){
    		element.diceRoll();
    		Log.prints('diceRoll done.');
    		return true;
    	});
    }
}


