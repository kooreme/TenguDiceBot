const COMMENT = /#/;
const MINUS = /-/g;
const SHORT_CUT_COMMAND = /^[kenhu]\d+(?:,\d+)*/i;

const Log = require('../util/log');
const util = require('../util/util');


function shortcutTransration(string) {
    let returnString = '';
    let returnStringArray = [];

    let searchComment = string.search(COMMENT);
    let comment = '';
    if (searchComment > 0) {
        comment = string.substring(searchComment);
        string = string.substring(0, searchComment);
    }

    string = string.replace(MINUS, '+-');
    let stringArray = string.split('+');
    Log.prints('shortcutTransration stringArray : ' + stringArray);

    for (let index = 0, strlen = stringArray.length; index < strlen; index++) {
        Log.prints('shortcutTransration : stringArray[' + index + '] : ' + stringArray[index]);

        let appendix;

        let appendixSearch = stringArray[index].search(util.EVERY_APPENDIX);
        if (appendixSearch >= 0) {
            appendix = translateAppendix(stringArray[index].substring(appendixSearch));
            stringArray[index] = stringArray[index].substring(0, appendixSearch);
            Log.prints('shortcutTransration : appendix :' + appendix + ' , stringArray[' + index + '] : ' + stringArray[index]);
        }
        let splits = stringArray[index].split(/([+-])/);
        Log.prints('shortcutTransration : splits :' + splits);

        let shortcutArray = [];
        for (let i = 0, l = splits.length; i < l; i++) {
            let optionString = '';
            if (SHORT_CUT_COMMAND.test(splits[i])) {
                let shortcut = splits[i].split(/([kenhu,])/i);

                for (let k = 0, m = shortcut.length; k < m; k++) {
                    Log.prints('shortcutTransration shortcut[' + k + '] : ' + shortcut[k]);

                    if (k === 1 && /[kenhu]/i.test(shortcut[k])) {
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
                                continue;
                        }
                    }

                    else if (/\d+/.test(shortcut[k])) {
                        let temp = shortcut[k] + 'd6' + optionString;
                        temp += (appendix != null) ? appendix : '';
                        shortcutArray.push(temp);
                    }
                    else if (shortcut[k] !== ',' && shortcut[k] !== '') {
                        throw new Error('NJShortcutTranslator : Invalid shortcut sentence.');
                    }
                }
            }
            else if (splits[i] === '+') {
                continue;
            }
            else {
                let temp = splits[i];
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

function translateAppendix(string) {
    let appendixString = string.substring(string.indexOf("["));
    appendixString = appendixString.substring(1,appendixString.length - 1);
    appendixString = appendixString.replace(/\]\[/g,',');

    let temp = appendixString.split(',');
	Log.prints('translateAppendix temp : 「' + temp + '」');

    let result = [];
	temp.forEach((element) => {
		result.push(appTransration(element.toLowerCase()));
	});

    return '[' + result.join('][') + ']';

}

function appTransration(string) {
	switch (string) {
		case 'j':
			string = '=1/ジツ暴走';
			break;
		case 's5':
			string = '>=5/サツバツ！';
			break;
		case 's':
		case 's6':
			string = '=6/サツバツ！';
			break;
		case 'c':
			string = '=4/コッポ判定';
			break;
		case 'l':
			string = '=6/LAN直結出目6数'
			break;
		default:
			break;

	}
	return string;

}
module.exports = shortcutTransration;