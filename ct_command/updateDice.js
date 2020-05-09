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

    //ダイスをアップデート
    const updateDice = await db.updateDice(data.flag ? null : message.channel.id,data.tableName,data.diceName,data.diceString);
    if (!updateDice) {
        return {result : false, message : 'ダイスの更新に失敗しました。'};
    }
    //ダイス名に可変数が含まれていたら可変数フラグをtrueにして保存する。
    if (/\+x/.test(data.diceString)) {
        //現在のデータレンジの最大・最小をチェック
        const dataRange = util.checkDataRange(userTable);
        Log.prints('dataRange.max = '+ dataRange.max + ', dataRange.min = ' + dataRange.min);
        const updateAdditionValue = await db.updateAddition(data.flag ? null : message.channel.id,data.tableName,true,dataRange.max,dataRange.min);
        if (!updateAdditionValue) {
            return {result : false, message : 'ダイスの更新に失敗しました。'};
        }
    }

    return { result: true, message : '**' + data.tableName +'**のダイスを更新しました。' };

}
exports.check = function(array) {
    if (array.length < 4 || array.length > 5) return '引数の数が不正です。詳細は「/ct help,updateDice」を確認してください。';
    if (!array[1]) return 'テーブル名が空です。テーブル名を指定してください。'
    if (!array[2]) return 'ダイスのショートカット名が空です。ダイスのショートカット名を記載してください。'
    if (!array[3]) return 'ダイス文字列が空です。ダイス文字列を記載してください。'
    if (!/^(?:\d+|\d+[dD]\d+)(?:[+-](?:\d+|\d+[dD]\d+))*(?:\+x)?$/.test(array[3])) return 'ダイス文字列に誤りがあります。正しい表記でダイス文字列を定義してください。'
    if (util.checkInvalidChar(spell.spellCheck(array[1]))) return 'テーブル名に半角英数字、特殊記号は使用できません。また、テーブル名は全角4文字以上を指定してください。';
    if (util.checkInvalidCharForDice(array[2])) return 'ダイスのショートカット名に使用できない文字があります。",\',`などの文字とスペースは使用できません。'
    if (array[4] && !util.checkFlagString(array[4])) return 'フラグに使用できない文字があります。t または f を指定するか、何も指定しないでください。'
    return null;
}
exports.adjust = function(array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    object.diceName = array[2].toLowerCase();
    object.diceString = array[3].toLowerCase();
    object.flag = array[4] ? util.isT(array[4]) : false;
    return object;
}