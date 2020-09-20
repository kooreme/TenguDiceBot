const DB = require('../DB/db_wrapper.js');
const util = require('./command_utility');
const spell = require('../util/util');
exports.run = async function (message, data) {
    let db = DB.db;

    //テーブル検索
    const old_userTable = await db.getUserTable(data.flag ? null : message.channel.id,data.oldTableName);
    if (!old_userTable) return {result:false, message : 'テーブルがありません。'};
    //新テーブル検索
    let new_userTable = await db.getUserTable(data.flag ? null : message.channel.id, data.newTableName);
    if (new_userTable) return { result: false, message: '新テーブル名のデータは既に存在します。' };
    //パーミッションチェック（０～２番の人のみ許可）
    let permission = old_userTable.permission;
    if (permission[0] !== message.author.id && permission[1] !== message.author.id && permission[2] !== message.author.id) {
        return { result : false, message : 'この操作は許可されていません。この操作はサーバ管理者またはテーブル作成者のみ可能です。'};
    }

    //テーブル名を変更して、オブジェクトを再生成
    new_userTable = { [data.newTableName] : old_userTable };

    //新テーブルを登録
    const updateTableName = await db.updateTableName(data.flag ? null : message.channel.id, new_userTable)
    if (!updateTableName) {
        return { result: false, message: '新テーブルの作成に失敗しました。bot管理者に連絡してください。' };
    }

    //旧テーブルを削除
    const deleteTable = await db.deleteTable(data.flag ? null : message.channel.id, data.oldTableName);
    if (!deleteTable) {
        return { result: false, message: '旧テーブルの作成に失敗しました。bot管理者に連絡してください。' };
    }

    return { result: true, message: 'テーブル名：「**' + data.oldTableName + '**」を「**'+ data.newTableName +'**」に更新しました。' };

}
exports.check = function (array) {
    if (array.length < 3 || array.length > 4) return '引数の数が不正です。詳細は「/ct help,updateTableName」を確認してください。';
    if (!array[1]) return '旧テーブル名が空です。テーブル名を指定してください。'
    if (!array[2]) return '新テーブル名が空です。テーブル名を指定してください。'
    if (array[1] === array[2]) return '旧テーブル名と新テーブル名が同一です。'
    if (util.checkInvalidChar(spell.spellCheck(array[1])) || util.checkInvalidChar(spell.spellCheck(array[2]))) return 'テーブル名に半角英数字、特殊記号は使用できません。また、テーブル名は全角4文字以上を指定してください。';
    if (array[3] && !util.checkFlagString(array[3])) return 'フラグに使用できない文字があります。t または f を指定するか、何も指定しないでください。'
    return null;
}
exports.adjust = function (array) {
    const object = {};
    object.oldTableName = spell.spellCheck(array[1]);
    object.newTableName = spell.spellCheck(array[2]);
    object.flag = array[3] ? util.isT(array[3]) : false;
    return object;
}