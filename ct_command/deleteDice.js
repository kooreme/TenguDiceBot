const DB = require('../db_wrapper.js');
const util = require('./command_utility');
const Log = require('../log');
const spell = require('../util');

exports.run = async function(message,data) {
    let db = DB.db;

    //テーブル検索
    const userTable = await db.getUserTable(data.flag ? null : message.channel.id,data.tableName);
    if (!userTable) return {result:false, message : 'テーブルがありません。'};
    //パーミッションチェック
    const permission = userTable.permission;
    Log.prints('updateDice:permission =' + permission.find(elem => {return elem === message.author.id;}));
    if (!permission.find(elem => {return elem === message.author.id})) return {result:false, message : 'このテーブルを操作する権限がありません。'};

    //削除するダイス以外に可変数を使用するダイスが残っていないかをチェックする。残ってたらtrue
    const existAdditionDice = isExistOtherAdditionDice(userTable.dice,data.diceName);

    //既にデータレンジの使用フラグをonにしていて、かつ可変数ダイスが残っていなければ、フラグをoffにして今後更新されないようにする。
    if (userTable.datarange && userTable.datarange.isUse && !existAdditionDice) {
        const updateAddition = await db.updateAddition(data.flag ? null : message.channel.id,data.tableName,false);
        if (!updateAddition) {
            return {result : false, message : 'ダイスの消去に失敗しました。'};
        }
    }

    //ダイスをアップデート
    const deleteDice = await db.deleteDice(data.flag ? null : message.channel.id,data.tableName,data.diceName);
    if (!deleteDice) {
        return {result : false, message : 'ダイスの消去に失敗しました。'};
    }

    return { result: true, message : '**' + data.tableName + '：' + data.diceName +'**のダイスを消去しました。' };

}
exports.check = function(array) {
    if (array.length < 3 || array.length > 4) return '引数の数が不正です。詳細は「/ct help,deleteDice」を確認してください。';
    if (!array[1]) return 'テーブル名が空です。テーブル名を指定してください。'
    if (!array[2]) return 'ダイスのショートカット名が空です。ダイスのショートカット名を記載してください。'
    if (util.checkInvalidChar(spell.spellCheck(array[1]))) return 'テーブル名に半角英数字、特殊記号は使用できません。また、テーブル名は全角4文字以上を指定してください。';
    if (/^[aA]$/.test(array[2])) return 'ショートカット名"a"（デフォルトダイス）は消去できません。変更する場合はupdateDiceを使用してください。'
    if (util.checkInvalidCharForDice(array[2])) return 'ダイスのショートカット名に使用できない文字があります。",\',`などの文字とスペースは使用できません。'
    if (array[3] && !util.checkFlagString(array[3])) return 'フラグに使用できない文字があります。t または f を指定するか、何も指定しないでください。'
    return null;
}
exports.adjust = function(array) {
    const object = {};
    object.tableName = spell.spellCheck(array[1]);
    object.diceName = array[2].toLowerCase();
    object.flag = array[3] ? util.isT(array[3]) : false;
    return object;
}

//削除対象のダイス以外に可変数を使用しているダイスショートカットが存在するかどうかを調査。
function isExistOtherAdditionDice(dice,checkExclusion) {
    let result = false;

    for (let [key,value] of Object.entries(dice)) {
        if (key === checkExclusion) continue;
        if (/\+x/.test(value)) {
            result = true;
            break;
        }
    }

    return result;
}