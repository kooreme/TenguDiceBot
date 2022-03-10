const DiceRoll = require('../classes/diceroll');
const Log = require('../util/log');
const error = require('./nd_errormessage');
const util = require('../util/util');

const SPACE_PLUS_SPACE = ' + ';

class NJDiscordReply {
    //静的クラスとして運用するのでnew禁止。
    constructor() {
        throw new Error('NJDiscordReplyはコンストラクタを作りません');
    }
}
NJDiscordReply.createMessage = (diceroll) => {
    if (!(diceroll instanceof DiceRoll))  {
        return diceroll;
    }
    let str = createOutput(diceroll.dice, diceroll.comment ? diceroll.comment : '');
    str += addTableOutput(diceroll);
    return str;

}

NJDiscordReply.createFixedDiceMessage = async (diceroll) => {
    return await receiveFixedMessage(diceroll)
    .catch((e) => {
        Log.prints(e.message);
        e.discordMessage = error.replyErrorMessage();
        throw e;
    });
}

function createOutput(dice, comment) {

    /*
    let str = '';
    let diceStr = '';
    let sumall = 0;
    dice.forEach((element) => {
        if (element.isMinus) {
            str = str + ' - ' + element.toString();
            sumall -= parseInt(element.sum, 10);
            diceStr = diceStr + '-' + element.trancedString;
        } else {
            str = str + ' + ' + element.toString();
            sumall += parseInt(element.sum, 10);
            diceStr = diceStr + '+' + element.trancedString;
        }
        Log.prints('element.sum : ' + element.sum);
        Log.prints('sumall : ' + sumall);
    });

    //先頭3文字（' + '）を除去
    str = str.substring(SPACE_PLUS_SPACE.length, str.length);
    diceStr = diceStr.substring('+'.length, diceStr.length);
    str = comment + '：\n`' + diceStr + '` = ' + str + ' = ' + sumall;
    */

    let str = "" + comment + "：\n";
    let diceStr = "";
    let sumall = 0;
    for (const d of dice) {
        diceStr += (diceStr ? (d.isMinus ? "`－" : "`＋") : "`") + d.trancedString + "` = " + d + "\n";
        sumall += (d.isMinus ? -1 : 1) * Number(d.sum);
    }
    //diceStr = diceStr.substring(2);

    str += diceStr + "合計値：" + sumall;

    return util.isSendableMessage(str, error);
}



function addTableOutput(diceroll) {
    let returnString = '';
    //前処理でテーブルを取得できていたら、ここで使用する。なければundefinedで進む。
    let checkDataTable = diceroll.tableData;
    let addString = '';
    let tableString = '';

    if (checkDataTable) {
        if (checkDataTable.d66Option) {
            Log.prints('addTableOutput diceinfo.dice[0].resArray[0]&resArray[1] :' + diceroll.dice[0].resArray[0] + ',' + diceroll.dice[0].resArray[1]);
            const array = util.sort(diceroll.dice[0].resArray);
            const d66 = Number(String(array[0]) + String(array[1]));
            Log.prints('addTableOutput d66 :' + d66);
            tableString = checkDataTable.data[d66];
        }
        else {
            if (diceroll.isTableAdditionValue) {
                //可変値を使うテーブルで可変値のダイスロールを行い、結果がデータのレンジ外だった場合は、レンジ内の最も近い値を結果として使用する。
                if (checkDataTable.datarange.max < diceroll.sumall) tableString = checkDataTable.data[checkDataTable.datarange.max];
                else if (checkDataTable.datarange.min > diceroll.sumall) tableString = checkDataTable.data[checkDataTable.datarange.min];
                else tableString = checkDataTable.data[diceroll.sumall];
            }
            else tableString = checkDataTable.data[diceroll.sumall];
        }
    }
    Log.prints('addTableOutput tableString :' + tableString);
    if (tableString) addString += '\n\n' + tableString;
    Log.prints('addTableOutput addString :' + addString);

    return returnString + addString;
}

async function receiveFixedMessage(diceroll) {
    const stringArray = diceroll.string.split('#');

    stringArray[0] = util.spellCheck(stringArray[0]);
    Log.prints(stringArray);
    let returnString = '';
    //データベースからの取得。private -> public -> defaultの順で検索。
    let checkDataTable = await diceroll.getTableData(stringArray[0]);
    if (checkDataTable && stringArray[1] != null && (!isNaN(stringArray[1])) && checkDataTable.data[stringArray[1]] != null) {
        returnString = '\n\n' + checkDataTable.data[stringArray[1]];
    }
    else {
        throw new Error('SearchTableDiceroll : Invalid Fixed String');
    }
    return returnString;
}


module.exports = NJDiscordReply;