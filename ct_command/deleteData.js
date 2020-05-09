const DB = require('../db_wrapper.js');
const util = require('./command_utility');
const Log = require('../log');
const spell = require('../util');

exports.run = async function(message,data) {
    let db = DB.db;

    //テーブル検索
    const userTable = await db.getUserTable(data.flag ? null : message.channel.id,data.tableName);
    if (!userTable) return {result:false, message : 'テーブルがありません。'};
    //パーミッションチェック
    let permission = userTable.permission;
    Log.prints('updateDice:permission =' + permission.find(elem => {return elem === message.author.id;}));
    if (!permission.find(elem => {return elem === message.author.id})) return {result:false, message : 'このテーブルを操作する権限がありません。'};

    //可変数を使用するダイスが残っていないかをチェックする。残ってたらtrue
    let existAdditionDice = isExistAdditionDice(userTable.dice);

    //可変数ダイスがある場合は再度レンジチェック。比較後に違いがある場合のみ、アップデート。
    if (existAdditionDice) {
        const dataRange = util.checkDataRange(userTable);
        if (dataRange.max !== userTable.datarange.max || dataRange.min !== userTable.datarange.min) {
            const updateAddition = await db.updateAddition(data.flag ? null : message.channel.id,data.tableName,userTable.datarange.isUse,dataRange.max,dataRange.min);
            if (!updateAddition) {
                return {result : false, message : 'ダイスの消去に失敗しました。'};
            }
        }
    }

    //ダイスをアップデート
    const deleteData = await db.deleteData(data.flag ? null : message.channel.id,data.tableName,data.dataIndex);
    if (!deleteData) {
        return {result : false, message : 'データの消去に失敗しました。'};
    }

    return { result: true, message : '**' + data.tableName + '：' + data.dataIndex +'**のデータを消去しました。' };

}
exports.check = function(array) {
    if (array.length < 3 || array.length > 4) return '引数の数が不正です。詳細は「/ct help,deleteDice」を確認してください。';
    if (!array[1]) return 'テーブル名が空です。テーブル名を指定してください。'
    if (!array[2]) return 'データ番号が空です。データ番号を記載してください。'
    if (!/^\d+$/.test(array[2])) return 'データ番号には半角数字（ダイスロールで発生しうる数値）を入力してください。'
    if (util.checkInvalidChar(spell.spellCheck(array[1]))) return 'テーブル名に使用できない文字があります。",\',`などの文字とスペースは使用できません。';
    if (array[3] && !util.checkFlagString(array[3])) return 'フラグに使用できない文字があります。t または f を指定するか、何も指定しないでください。'
  return null;
}
exports.adjust = function(array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    object.dataIndex = String(array[2]);
    object.flag = array[3] ? util.isT(array[3]) : false;
    return object;
}

function isExistAdditionDice(dice) {
    let result = false;

    for (let value of dice.values()) {
        if (/\+x/.test(value)) {
            result = true;
            break;
        }
    }

    return result;
}