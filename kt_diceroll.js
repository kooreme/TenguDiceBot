
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

function normalDiceRoll(string) {
    let diceinfo = {};

    string = checkTable(string);
    diceinfo = util.normalDiceRoll(checkTable(string));

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
    let diceroll = '';
    switch(string) {
        //ダイス不要の表
        case '犬小屋':
            diceroll = '1d1';   //本来いらないが、エラーと分けるのがクッソめんどいのでダイス自体は振らせる。
            break;

        //D6ダイス表
        case '進行ルート表' :
        case '魔王追撃表' :
        case 'ファンブル表' :
        case '逃走判定表' :
        case 'ランダムイベント表' :
        case 'ダンジョン表A' :
        case 'ダンジョン表B' :
        case '野外遭遇表' :
        case '草原野外モンスター表' :
        case '遺跡群野外モンスター表' :
        case '荒野野外モンスター表' :
        case '山岳野外モンスター表' :
        case '砂漠野外モンスター表' :
        case '雪原野外モンスター表' :
        case '火山野外モンスター表' :
        case '浸食地帯野外モンスター表' :
        case '希少動物表' :
        case '会話テーマ表' :
        case 'ランダム宝石表' :
        case '上位武器付与表' :
        case '上位防具付与表' :
        case 'ドロップアイテム表' :
        case '偵察表' :
            diceroll = '1d6';
            break;
        default:
            break;
    }

    if (diceroll !== '') {
        diceroll += '#' + string;

        returnString = diceroll;

    }
    else {
        returnString = string;
    }
    return returnString;

};

function addTableOutput(diceinfo) {
    switch(diceinfo.comment) {
    //ダイスロール不要の表（説明用）
    case '犬小屋':
        return '\n\n'  + datatable.d1Table[diceinfo.comment];
    
    //D6を振る表
    case '進行ルート表' :
    case '魔王追撃表' :
    case 'ファンブル表' :
    case '逃走判定表' :
    case 'ランダムイベント表' :
    case 'ダンジョン表A' :
    case 'ダンジョン表B' :
    case '野外遭遇表' :
    case '草原野外モンスター表' :
    case '遺跡群野外モンスター表' :
    case '荒野野外モンスター表' :
    case '山岳野外モンスター表' :
    case '砂漠野外モンスター表' :
    case '雪原野外モンスター表' :
    case '火山野外モンスター表' :
    case '浸食地帯野外モンスター表' :
    case '希少動物表' :
    case '会話テーマ表' :
    case 'ランダム宝石表' :
    case '上位武器付与表' :
    case '上位防具付与表' :
    case 'ドロップアイテム表' :
    case '偵察表' :
        Log.prints('addTableOutput diceinfo.dice.sum :' +  diceinfo.dice[0].sum );
        return '\n\n'  + datatable.d6Table[diceinfo.comment][Number(diceinfo.dice[0].sum) - 1];
    default:
        return '';
    }
}

