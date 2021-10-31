const DB = require('../DB/db_wrapper');
const util = require('./command_utility');
const spell = require('../util/util');
const Log = require('../util/log');
exports.run = async function (ids, data) {
    let db = DB.db;

    //テーブル検索
    let table = await db.getUserTable(data.flag ? null : ids.channelId, data.tableName);
    if (!table) return { result: false, message: 'テーブルがありません。' };

    //テーブルデータ表示
    let returnString = createTableDataString(data.tableName,table);

    return { result: true, message: returnString };

}
exports.check = function (array) {
    if (array.length < 2 || array.length > 3) return '引数の数が不正です。詳細は「/ct help,deletePermission」を確認してください。';
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

function createTableDataString(tableName,table) {
    let message = [];
    let firstMessage = `テーブル名 : __**${tableName}**__`;
    firstMessage += '\n\n**ショートカットダイス**\n`';
    let isFirst = true;
    for (let [key,value] of Object.entries(table.dice)) {
        if (isFirst) {
            firstMessage += `${key} : ${value}`;
            isFirst = false;
        }
        else firstMessage += ` , ${key} : ${value}`;
    }
    firstMessage += '`';
    message.push(firstMessage);

    let dataMessage = ["\n**データ**\n"];
    let charCount = 0;
    let tmpStr = '';
    for (let i = 0,keys = Object.keys(table.data); i <= keys.length-1; i++) {
        let str = `${keys[i]} : \n${table.data[keys[i]]}\n\n`;
        charCount += str.length;
        if (charCount >= 1900) {
            dataMessage.push('```' + tmpStr + '```');
            tmpStr = str;
            charCount = tmpStr.length;
        }
        else {
            tmpStr += str;
        }
        if (i === keys.length-1) {
            dataMessage.push('```' + tmpStr + '```');
        }
    }
    message = message.concat(dataMessage);
    Log.prints(message);
    return message;
}