const error = require('./errormessage')
const util = require('./util.js');
const Log = require('./log.js');
const datatable = require('./kt_datatable');
//const Help = require('./help.js');

/**
receiveDiceRoll
引数：String string ※メッセージ反応部はあらかじめ取り除くこと。
戻り値：String
ダイスロールメッセージを受信する。
*/
exports.receiveDiceRoll = function(string) {
    //スペースを除去
    string = string.replace(/\s+/g, '');
/*
    if (HELP.test(string)) {
    	return Help.help;
    }
*/

    //通常ダイスロール
    return normalDiceRoll(checkTable(string));

};

exports.receiveFixedMessage = function(string) {
    const stringArray = string.split('#');
    
    Log.prints(stringArray);
    return FixedOutputMessage(stringArray) ;

}

function normalDiceRoll(string) {
    let diceinfo = {};
    
    let dicestring = checkTable(string);
   
    diceinfo = util.normalDiceRoll(dicestring);
    if (diceinfo == null) {
        return error.replyErrorMessage();
    }

    if (diceinfo.dice.length == 0) {
        Log.prints('no dice error');
        return diceinfo.comment;
    }

    Log.prints('diceinfo : ' + diceinfo);
    returnString = util.createOutput(diceinfo.dice,diceinfo.comment);

    returnString += addTableOutput(diceinfo);
    Log.prints('returnString : ' + returnString);

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

function FixedOutputMessage(array){
    let returnString = '';
    const checkDataTable = datatable.dataTable[array[0]];

    if (checkDataTable && array[1] != null && (!isNaN(array[1])) && checkDataTable.data[array[1]] != null) {
        returnString = '\n\n' + checkDataTable.data[array[1]];
    }
    else {
        returnString = error.replyErrorMessage();
    }

    return returnString;

};