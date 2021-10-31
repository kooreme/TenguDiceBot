const DB = require('../DB/db_wrapper');
const util = require('./command_utility');
const spell = require('../util/util');
const datatable = require('../tengu_dice/nd_datatable')
exports.run = async function(ids,data) {
    let mes = '';
    const db = DB.db;

    //テーブルを検索し、重複したらエラー
    const defaultTable = datatable.dataTable[data.tableName];
    if (defaultTable) return {result: false, message : '公式で使用される表と同じ名前をつけることはできません。'};
    const privateTable = await db.getUserTable(ids.channelId, data.tableName);
    if (privateTable) return {result: false, message : '同名のテーブルがこのチャンネルに存在します。'};

    //テーブル作成
    const createTable = await db.createTable(data.tableName, ids.channelId, ids.guildOwnerId, ids.authorId);
    if (!createTable) return {result: false, message : 'テーブルの作成に失敗しました。'};
    else mes += 'このチャンネルにテーブル：「**' + data.tableName + '**」を作成しました。';

    return { result: true, message : mes };

    
}
exports.check = function(array) {
    if (array.length !== 2) return '引数の数が不正です。詳細は「/ct help,createTable」を確認してください。';
    if (!array[1]) return 'テーブル名が空です。テーブル名を指定してください。'
    if (util.checkInvalidChar(spell.spellCheck(array[1]))) return 'テーブル名に半角英数字、特殊記号は使用できません。また、テーブル名は全角4文字以上を指定してください。';
    return null;
}
exports.adjust = function(array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    return object;
}