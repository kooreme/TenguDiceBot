const DB = require('../db_wrapper.js');
const util = require('./command_utility');
const spell = require('../util');
const datatable = require('../nd_datatable');
exports.run = async function(message,data) {
    const db = DB.db;

    //テーブル検索
    let table = await db.getUserTable(message.channel.id, data.tableName);
    if (!table) return { result: false, message: 'テーブルがありません。' };

    //テーブルを検索し、重複したらエラー
    const defaultTable = datatable.dataTable[data.tableName];
    if (defaultTable) return {result: false, message : '公式で使用される表と同じ名前をつけることはできません。'};
    const publicTable = await db.getUserTable(null,data.tableName);
    if (publicTable) return {result: false, message : '同名のテーブルがpublicに公開されています。テーブル名を変更してください。'};
    //データの整合性チェック（ただし、可変数を使用するダイスが含まれる場合はスキップ）
    if (!table.datarange || !table.datarange.isUse) {
        const dataVerify = dataVerification(table,data.tableName);
        if (dataVerify != null) return {result : false, message : dataVerify};
    }
    //テーブル作成
    let pub_table = {[data.tableName] : table};
    const publishTable = await db.publishTable(pub_table);
    if (!publishTable) return {result: false, message : 'テーブルの作成に失敗しました。bot管理者に連絡してください。'};
    const deleteTable = await db.deleteTable(message.channel.id,data.tableName);
    if (!deleteTable) return {result: false, message : 'テーブルの削除に失敗しました。bot管理者に連絡してください。'};

    return { result: true, message : '「**' + data.tableName + '**」を全サーバーに公開しました。' };    
}

exports.check = function(array) {
    if (array.length !== 2) return '引数の数が不正です。詳細は「/ct help,publishTable」を確認してください。';
    if (!array[1]) return 'テーブル名が空です。テーブル名を指定してください。'
    if (util.checkInvalidChar(spell.spellCheck(array[1]))) return 'テーブル名に半角英数字、特殊記号は使用できません。また、テーブル名は全角4文字以上を指定してください。';
    return null;
}

exports.adjust = function(array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    return object;
}

function dataVerification(table,tableName) {
    //登録されたダイスの値の範囲をチェック
    let range = {"min" : null, "max" : null};

    for (let value of Object.values(table.dice)) {
        //引き算をチェック
        value = value.replace(/-/g ,'+-');
        let dice_split = value.split('+');
        
        let dice_min = 0;
        dice_split.forEach((elm) =>{
            let split = elm.split('d');
            if (split.length !== 2) dice_min += split[0];
            else dice_min += Number(split[0]) * 1;
        });

        let dice_max = 0;
        dice_split.forEach((elm) =>{
            let split = elm.split('d');
            if (split.length !== 2) dice_max += split[0];
            else dice_max += Number(split[0]) * Number(split[1]);
        });
        if (range.min == null || range.min > dice_min) {
            range.min = dice_min;
        }
        if (range.max == null || range.max < dice_max) {
            range.max = dice_max;
        }
    }
    let keys = Object.keys(table.data);

    let errNumber = [];
    for(let i = range.min; i <= range.max; i++) {
        let check = keys.indexOf(String(i)); 
        if (check === -1) errNumber.push(i);
    }
    if (errNumber.length !== 0) return `出目番号：${errNumber.toString()} のデータが見つかりません。データを修正・追加してください。`
    if (keys.length !== range.max - range.min + 1) {
        let mes = 
`データ数と取りうる出目に差異があります。不要なデータを削除してください。
登録データ数:${keys.length} , 出目範囲:${range.min}~${range.max}
詳細は /ct checkTableData,${tableName}を確認してください。`;
        return mes;
    }

    //チェック完了。問題なし
    return null;
}