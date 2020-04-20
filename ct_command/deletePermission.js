const DB = require('../db.js');
const util = require('./command_utility');
const spell = require('../util');

exports.run = function(message,data) {
    let db = DB.db;

    //チャンネル検索
    if (!db.findChannel(data.flag ? null : message.channel.id)) return {result:false, message : 'テーブルがありません。'};
    //テーブル検索
    if (!db.getUserTable(data.flag ? null : message.channel.id,data.tableName)) return {result:false, message : 'テーブルがありません。'};
    //パーミッションチェック（０～２番の人のみ許可）
    let permission = db.getPermission(data.flag ? null : message.channel.id,data.tableName);
    if (permission[0] != message.author.id && permission[1] != message.author.id && permission[2] != message.author.id) {
        return { result : false, message : 'この操作は許可されていません。この操作はサーバ管理者またはテーブル作成者のみ可能です。'};
    }
    //重複チェック
    //管理者範囲のチェック。該当したら消去禁止。
    let permission_admin = permission.slice(0,2);
    let isAdmin = permission_admin.find((elem) => {return elem === data.userID});
    if (isAdmin) return {result : false, message : 'このユーザIDは削除を許可されていません。'};
    
    //限定ユーザのチェック。該当者がいなければ終了。
    let permission_user = permission.slice(3);
    let isUser = permission_user.find((elem) => {return elem === data.userID});
    if (!isUser) return {result : false, message : 'このユーザIDは削除可能な範囲に登録されていません。'};

    //パーミッションをアップデート
    if (!db.deletePermission(data.flag ? null : message.channel.id,data.tableName,data.userID)) {
        return {result : false, message : 'パーミッションの更新に失敗しました。'};
    }

    return { result: true, message : '**' + data.tableName +'**から' + data.userID + 'のパーミッションを消去しました。' };

}
exports.check = function(array) {
    if (array.length < 3 || array.length > 4) return '引数の数が不正です。詳細は「/ct help,deletePermission」を確認してください。';
    if (!array[1]) return 'テーブル名が空です。テーブル名を指定してください。'
    if (!array[2]) return 'ユーザIDが空です。ユーザIDの数字を記載してください。'
    if (!/^\d+$/.test(array[2])) return 'ユーザIDに誤りがあります。半角数字でユーザIDの数字を記載してください。'
    if (util.checkInvalidChar(spell.spellCheck(array[1]))) return 'テーブル名に半角英数字、特殊記号は使用できません。また、テーブル名は全角4文字以上を指定してください。';
    if (array[3] && !util.checkFlagString(array[3])) return 'フラグに使用できない文字があります。t または f を指定するか、何も指定しないでください。'
    return;
}
exports.adjust = function(array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    object.userID = array[2];
    object.flag = array[3] ? util.isT(array[3]) : false;
    return object;
}