const DB = require('../db.js');
const util = require('./command_utility');
const spell = require('../util');
exports.run = function(message,data) {
    let mes = '';
    const db = DB.db;

    //チャンネルIDが登録されていなかった場合は新規作成する。
    if (!db.findChannel(message.channel.id)) {
        db.createChannel(message.channel.id);
        mes += 'DBにこのチャンネルを登録しました。\n';
    }
    //テーブルを検索し、重複したらエラー
    const defaultTable = db.getDefaultTable(db.ND_DATATABLE,data.tableName);
    if (defaultTable) return {result: false, message : '公式で使用される表と同じ名前をつけることはできません。'};
    const privateTable = db.getUserTable(message.channel.id, data.tableName);
    if (privateTable) return {result: false, message : '同名のテーブルがこのチャンネルに存在します。'};

    //テーブル作成
    if (!db.createTable(data.tableName, message.channel.id, message.guild.owner.id, message.author.id)) return {result: false, message : 'テーブルの作成に失敗しました。'};
    else mes += 'このチャンネルにテーブル：「**' + data.tableName + '**」を作成しました。';

    return { result: true, message : mes };

    
}
exports.check = function(array) {
    if (array.length != 2) return '引数の数が不正です。詳細は「/ct help,createTable」を確認してください。';
    if (!array[1]) return 'テーブル名が空です。テーブル名を指定してください。'
    if (util.checkInvalidChar(spell.spellCheck(array[1]))) return 'テーブル名に半角英数字、特殊記号は使用できません。また、テーブル名は全角4文字以上を指定してください。';
    return;
}
exports.adjust = function(array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    return object;
}