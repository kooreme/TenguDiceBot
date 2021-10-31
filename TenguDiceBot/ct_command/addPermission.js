const DB = require('../DB/db_wrapper.js');
const util = require('./command_utility');
const spell = require('../util/util');

exports.run = async function(ids,data) {
    let db = DB.db;

    //テーブル検索
    const userTable = await db.getUserTable(data.flag ? null : ids.channelId,data.tableName);
    if (!userTable) return {result:false, message : 'テーブルがありません。'};
    //パーミッションチェック（０～２番の人のみ許可）
    let permission = userTable.permission;
    if (permission[0] !== ids.authorId && permission[1] !== ids.authorId && permission[2] !== ids.authorId) {
        return { result : false, message : 'この操作は許可されていません。この操作はサーバ管理者またはテーブル作成者のみ可能です。'};
    }
    //重複チェック
    let isUser = permission.find((elem) => {return elem === data.userID});
    if (isUser) return {result : false, message : 'このユーザは既に登録されています。'};

    //パーミッションをアップデート
    permission.push(data.userID);
    const addPermission = await db.updatePermission(data.flag ? null : ids.channelId,data.tableName,permission);
    if (!addPermission) {
        return {result : false, message : 'パーミッションの更新に失敗しました。'};
    }

    return { result: true, message : '**' + data.tableName +'**のパーミッションを追加しました。\n許可されたユーザはこのテーブルの内容を編集できます。' };

}
exports.check = function(array) {
    if (array.length < 3 || array.length > 4) return '引数の数が不正です。詳細は「/ct help,addPermission」を確認してください。';
    if (!array[1]) return 'テーブル名が空です。テーブル名を指定してください。'
    if (!array[2]) return 'ユーザIDが空です。ユーザIDの数字を記載してください。'
    if (!/^\d+$/.test(array[2])) return 'ユーザIDに誤りがあります。半角数字でユーザIDの数字を記載してください。'
    if (util.checkInvalidChar(spell.spellCheck(array[1]))) return 'テーブル名に半角英数字、特殊記号は使用できません。また、テーブル名は全角4文字以上を指定してください。';
    if (array[3] && !util.checkFlagString(array[3])) return 'フラグに使用できない文字があります。t または f を指定するか、何も指定しないでください。'
    return null;
}
exports.adjust = function(array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    object.userID = array[2];
    object.flag = array[3] ? util.isT(array[3]) : false;
    return object;
}