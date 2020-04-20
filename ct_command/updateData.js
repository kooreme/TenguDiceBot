const DB = require('../db.js');
const util = require('./command_utility');
const Log = require('../log');
const spell = require('../util');

exports.run = function(message,data) {
    let db = DB.db;

    //チャンネル検索
    if (!db.findChannel(data.flag ? null : message.channel.id)) return {result:false, message : 'テーブルがありません。'};
    //テーブル検索
    if (!db.getUserTable(data.flag ? null : message.channel.id,data.tableName)) return {result:false, message : 'テーブルがありません。'};
    //パーミッションチェック
    let permission = db.getPermission(data.flag ? null : message.channel.id,data.tableName);
    Log.prints('updateDice:permission =' + permission.find(elem => {return elem === message.author.id;}));
    if (!permission.find(elem => {return elem === message.author.id})) return {result:false, message : 'このテーブルを操作する権限がありません。'};

    //ダイスをアップデート
    if (!db.updateData(data.flag ? null : message.channel.id,data.tableName,data.dataIndex,data.dataString)) {
        return {result : false, message : 'データの更新に失敗しました。'};
    }

    return { result: true, message : '**' + data.tableName +'**のデータを更新しました。' };

}
exports.check = function(array) {
    if (array.length < 4 || array.length > 5) return '引数の数が不正です。詳細は「/ct help,updateData」を確認してください。';
    if (!array[1]) return 'テーブル名が空です。テーブル名を指定してください。'
    if (!array[2]) return 'データ番号が空です。データ番号を記載してください。'
    if (!array[3]) return '結果文字列が空です。結果文字列を記載してください。'
    if (!/^\d+$/.test(array[2])) return 'データ番号には半角数字（ダイスロールで発生しうる数値）を入力してください。'
    if (util.checkInvalidChar(spell.spellCheck(array[1]))) return 'テーブル名に半角英数字、特殊記号は使用できません。また、テーブル名は全角4文字以上を指定してください。';
    if (array[4] && !util.checkFlagString(array[4])) return 'フラグに使用できない文字があります。t または f を指定するか、何も指定しないでください。'
    return;
}
exports.adjust = function(array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    object.dataIndex = String(array[2]);
    object.dataString = array[3];
    object.flag = array[4] ? util.isT(array[4]) : false;
    return object;
}