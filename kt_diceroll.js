
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
        case '犬小屋' :
        case '耳長たちの村' :
        case '山小屋' :
        case '聖なる神殿' :
        case '闇ギルド' :
        case '雪国の小屋' :
        case '魔王の力を封じた神殿' :
        case '滅びた石の小屋' :
        case '滅びた小さな村' :
        case 'アンデッドの群れ' :
        case '盗賊の群れ' :
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
        case '闇の竜追撃表' :
            diceroll = '1d6';
            break;

        //2D6表
        case '施設表' :
        case '村遭遇表' :
        case 'ダンジョン遭遇表' :
        case '牢獄遭遇表' :
        case 'ランダムNPC特徴表' :
        case '武器付与効果表' :
        case '防具付与効果表' :
        case '聖武具ドロップ表' :
        //D66表
        case '世界の旅表' :
        case 'モンスター特徴表' :
        case '武器ドロップ表' :
        case '防具ドロップ表' :
        case '食品ドロップ表' :
        case '巻物ドロップ表' :
        case 'その他ドロップ表' :
            diceroll = '2d6';
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
    case '犬小屋' :
    case '耳長たちの村' :
    case '山小屋' :
    case '聖なる神殿' :
    case '闇ギルド' :
    case '雪国の小屋' :
    case '魔王の力を封じた神殿' :
    case '滅びた石の小屋' :
    case '滅びた小さな村' :
    case 'アンデッドの群れ' :
    case '盗賊の群れ' :
        return '\n\n'  + datatable.tableD1[diceinfo.comment];
    
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
    case '闇の竜追撃表' :
        Log.prints('addTableOutput diceinfo.dice.sum :' +  diceinfo.dice[0].sum );
        return '\n\n' + datatable.tableD6[diceinfo.comment][Number(diceinfo.dice[0].sum) - 1];
    
    //2D6表
    case '施設表' :
    case '村遭遇表' :
    case 'ダンジョン遭遇表' :
    case '牢獄遭遇表' :
    case 'ランダムNPC特徴表' :
    case '武器付与効果表' :
    case '防具付与効果表' :
    case '聖武具ドロップ表' :  
        Log.prints('addTableOutput diceinfo.dice.sum :' +  diceinfo.dice[0].sum );
        return '\n\n' + datatable.table2D6[diceinfo.comment][Number(diceinfo.dice[0].sum) - 2];

    //D66表
    case '世界の旅表' :
    case 'モンスター特徴表' :
    case '武器ドロップ表' :
    case '防具ドロップ表' :
    case '食品ドロップ表' :
    case '巻物ドロップ表' :
    case 'その他ドロップ表' :
        Log.prints('addTableOutput diceinfo.dice[0].resArray[0]&resArray[1] :' +  diceinfo.dice[0].resArray[0] + ',' +  diceinfo.dice[0].resArray[1]);
        const array = util.sort(diceinfo.dice[0].resArray);
        const d66 = Number(String(array[0]) + String(array[1]));
        Log.prints('addTableOutput d66 :' +  d66);
        return '\n\n' + datatable.tableD66[diceinfo.comment][d66];
        
    default:
        return '';
    }
};