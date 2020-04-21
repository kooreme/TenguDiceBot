const DB = require('../db.js');
const util = require('./command_utility');
const spell = require('../util');
exports.run = function (message, data) {
    let db = DB.db;

    //チャンネル検索
    if (!db.findChannel(data.flag ? null : message.channel.id)) return { result: false, message: 'テーブルがありません。' };
    //テーブル検索
    if (!db.getUserTable(data.flag ? null : message.channel.id, data.tableName)) return { result: false, message: 'テーブルがありません。' };
    //パーミッションチェック（０～２番の人のみ許可）
    let permission = db.getPermission(data.flag ? null : message.channel.id, data.tableName);
    //publicの削除はくりーむのみ。
    if (data.flag) {
        if (permission[0] != message.author.id) {
            return { result: false, message: 'この操作は許可されていません。' };
        }
    }
    else {
        if (permission[0] != message.author.id && permission[1] != message.author.id && permission[2] != message.author.id) {
            return { result: false, message: 'この操作は許可されていません。この操作はサーバ管理者またはテーブル作成者のみ可能です。' };
        }
    }

    //テーブル削除
    if (!db.deleteTable(data.flag ? null : message.channel.id, data.tableName)) {
        return { result: false, message: 'テーブルの更新に失敗しました。' };
    }

    return { result: true, message: '**' + data.tableName + '**を消去しました。' };

}
exports.check = function (array) {
    if (array.length < 2 || array.length > 3) return '引数の数が不正です。詳細は「/ct help,deleteTable」を確認してください。';
    if (!array[1]) return 'テーブル名が空です。テーブル名を指定してください。'
    if (util.checkInvalidChar(spell.spellCheck(array[1]))) return 'テーブル名に半角英数字、特殊記号は使用できません。また、テーブル名は全角4文字以上を指定してください。';
    if (array[2] && !util.checkFlagString(array[2])) return 'フラグに使用できない文字があります。t または f を指定するか、何も指定しないでください。'
    return;
}
exports.adjust = function (array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    object.flag = array[2] ? util.isT(array[2]) : false;
    return object;
}