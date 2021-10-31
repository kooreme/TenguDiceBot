const DB = require('../DB/db_wrapper.js');
const util = require('./command_utility');
const spell = require('../util/util');
exports.run = async function (ids, data) {
    let db = DB.db;

    //テーブル検索
    const userTable = await db.getUserTable(data.flag ? null : ids.channelId,data.tableName);
    if (!userTable) return {result:false, message : 'テーブルがありません。'};
    //パーミッションチェック（０～２番の人のみ許可）
    let permission = userTable.permission;
    //publicの削除はくりーむのみ。
    if (data.flag) {
        if (permission[0] !== ids.authorId) {
            return { result: false, message: 'この操作は許可されていません。' };
        }
    }
    else {
        if (permission[0] !== ids.authorId && permission[1] !== ids.authorId && permission[2] !== ids.authorId) {
            return { result: false, message: 'この操作は許可されていません。この操作はサーバ管理者またはテーブル作成者のみ可能です。' };
        }
    }

    //テーブル削除
    const deleteTable = await db.deleteTable(data.flag ? null : ids.channelId, data.tableName);
    if (!deleteTable) {
        return { result: false, message: 'テーブルの更新に失敗しました。' };
    }

    return { result: true, message: '**' + data.tableName + '**を消去しました。' };

}
exports.check = function (array) {
    if (array.length < 2 || array.length > 3) return '引数の数が不正です。詳細は「/ct help,deleteTable」を確認してください。';
    if (!array[1]) return 'テーブル名が空です。テーブル名を指定してください。'
    if (util.checkInvalidChar(spell.spellCheck(array[1]))) return 'テーブル名に半角英数字、特殊記号は使用できません。また、テーブル名は全角4文字以上を指定してください。';
    if (array[2] && !util.checkFlagString(array[2])) return 'フラグに使用できない文字があります。t または f を指定するか、何も指定しないでください。'
    return null;
}
exports.adjust = function (array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    object.flag = array[2] ? util.isT(array[2]) : false;
    return object;
}