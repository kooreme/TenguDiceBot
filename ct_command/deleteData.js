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
    if (!db.deleteData(data.flag ? null : message.channel.id,data.tableName,data.dataIndex)) {
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
  return;
}
exports.adjust = function(array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    object.dataIndex = String(array[2]);
    object.flag = array[3] ? util.isT(array[3]) : false;
    return object;
}