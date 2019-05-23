//dice.js
const COMMENT = /#/;
const MINUS = /-/g;
const SHORT_CUT_COMMAND = /^[kenhu]\d+(?:,\d+)*/i;
const WASSHOI = /^wasshoi\d+$/i;
const HELP = /^help$/;

const wasshoi = require('./wasshoi.js');
const util = require('./util.js');
const Log = require('./log.js');
const Help = require('./help.js');
const error = require('./errormessage');
const datatable = require('./nd_datatable');

const STRING_WASSHOI = 'wasshoi';


/**
receiveDiceRoll
引数：String string ※メッセージ反応部はあらかじめ取り除くこと。
戻り値：String
ダイスロールメッセージを受信する。
*/
exports.receiveDiceRoll = function (string) {
	//スペースを除去
	string = string.replace(/\s+/g, '');

	if (HELP.test(string)) {
		return Help.help;
	}

	if (WASSHOI.test(string)) {
		return wasshoi.wasshoiDiceRoll(string.substring(STRING_WASSHOI.length));
	}

	//通常ダイスロール
	return normalDiceRoll(string);

};

function normalDiceRoll(string) {
	//コマンド表が無いか確認する。
	string = checkTable(string);
	//ショートカットコマンドを翻訳する
	let diceinfo = {};
	string = shortcutTransration(string);
	diceinfo = util.normalDiceRoll(string);
	if (diceinfo == null) {
		return error.replyErrorMessage();
	}

	if (diceinfo.dice.length == 0) {
		Log.prints('no dice error');
		return diceinfo.comment;
	}

	Log.prints('diceinfo : ' + diceinfo);
	returnString = util.createOutput(diceinfo.dice, diceinfo.comment);
	Log.prints('returnString : ' + returnString);

	returnString += addTableOutput(diceinfo);

	return returnString;

}

/**
 * shortcutTransration
 * ショートカット記法を翻訳し、文字列を返す。
 * */
function shortcutTransration(string) {
	var returnString = '';
	var returnStringArray = [];

	var searchComment = string.search(COMMENT);
	if (searchComment > 0) {
		var comment = string.substring(searchComment);
		var string = string.substring(0, searchComment);
	}

	string = string.replace(MINUS, '+-');
	var stringArray = string.split('+');
	Log.prints('shortcutTransration stringArray : ' + stringArray);

	for (var index = 0, strlen = stringArray.length; index < strlen; index++) {
		Log.prints('shortcutTransration : stringArray[' + index + '] : ' + stringArray[index]);
		var appendixSearch = stringArray[index].search(util.EVERY_APPENDIX);
		if (appendixSearch >= 0) {
			var appendix = stringArray[index].substring(appendixSearch);
			stringArray[index] = stringArray[index].substring(0, appendixSearch);
			Log.prints('shortcutTransration : appendix :' + appendix + ' , stringArray[' + index + '] : ' + stringArray[index]);
		}
		var splits = stringArray[index].split(/([\+\-])/);
		Log.prints('shortcutTransration : splits :' + splits);

		var shortcutArray = [];
		for (var i = 0, l = splits.length; i < l; i++) {
			var optionString = '';
			if (SHORT_CUT_COMMAND.test(splits[i])) {
				var shortcut = splits[i].split(/([kenhu,])/);

				for (var k = 0, m = shortcut.length; k < m; k++) {
					Log.prints('shortcutTransration shortcut[' + k + '] : ' + shortcut[k]);

					if (k == 1 && /[kenhu]/i.test(shortcut[k])) {
						switch (shortcut[k]) {
							case 'k':
							case 'K':
								optionString = '>=2';
								break;
							case 'e':
							case 'E':
								optionString = '>=3';
								break;
							case 'n':
							case 'N':
								optionString = '>=4';
								break;
							case 'h':
							case 'H':
								optionString = '>=5';
								break;
							case 'u':
							case 'U':
								optionString = '=6';
								break;
							default:
								returnString = util.ERROR_FLAG;
								continue;
						}
					}

					else if (/\d+/.test(shortcut[k])) {
						var temp = shortcut[k] + 'd6' + optionString;
						temp += (appendix != null) ? appendix : '';
						shortcutArray.push(temp);
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
				var temp = splits[i];
				temp += (appendix != null) ? appendix : '';
				shortcutArray.push(temp);
			}
		}
		returnStringArray.push(shortcutArray.join('+'));
	}
	returnString = returnStringArray.join('+');
	returnString += (comment != null) ? comment : '';
	Log.prints('shortcutTransration returnString : ' + returnString);

	returnString = returnString.replace(/\+-\+/g, '-');
	returnString = returnString.replace(/\+-/g, '-');
	returnString = returnString.replace(/\+#\+/g, '#');

	Log.prints('shortcutTransration returnString : ' + returnString);
	return returnString;
}

function checkTable(string) {
    let returnString = '';
    const checkDataTable = datatable.dataTable[string];
    Log.prints('checkDataTable =' + checkDataTable);

    if (checkDataTable) {
        returnString = checkDataTable.dice + '#' + string;
    }
    else {
        returnString = string;
    }
    return returnString;

};

function addTableOutput(diceinfo) {
    let returnString = '';
    const checkDataTable = datatable.dataTable[diceinfo.comment];

    if (checkDataTable) {
        if (checkDataTable.d66Option) {
            Log.prints('addTableOutput diceinfo.dice[0].resArray[0]&resArray[1] :' +  diceinfo.dice[0].resArray[0] + ',' +  diceinfo.dice[0].resArray[1]);
            const array = util.sort(diceinfo.dice[0].resArray);
            const d66 = Number(String(array[0]) + String(array[1]));
            Log.prints('addTableOutput d66 :' +  d66);
            returnString += '\n\n' + datatable.dataTable[diceinfo.comment].data[d66];
        }
        else {
            returnString += '\n\n'  + datatable.dataTable[diceinfo.comment].data[Number(diceinfo.dice[0].sum)];
        }
    }

    return returnString;
};


