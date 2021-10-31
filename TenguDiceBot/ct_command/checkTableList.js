const DB = require('../DB/db_wrapper');
const Log = require('../util/log');
exports.run = async function (ids) {
    let db = DB.db;

    //publicの全テーブルと、現チャンネルのプライベートテーブルを取得
    let table = await db.getAllTable(ids.channelId);
    //メッセージを作成
    let returnString = createTableListString(table);

    return { result: true, message: returnString };

}
exports.check = function (array) {
    if (array.length !== 1) return '引数の数が不正です。詳細は「/ct help,checkTableList」を確認してください。';
    return null;
}
exports.adjust = function () {
    const object = {};
    return object;
}

function createTableListString(table) {
    let message = [];
    message.push(
        `◆テーブル一覧◆
用例：
**テーブル名**
\`ショートカット名 : ダイス, [... ショートカット名 : ダイス]\`
`
    );
    message.push(createTableMessage('__**公開テーブル**__\n\n', table.public));
    message.push(createTableMessage('__**チャンネル内テーブル**__\n\n', table.private));

    return message;
}

function createTableMessage(startMessage, object) {
    let message = startMessage;
    if (object) {
        Object.keys(object).forEach((key) => {
            message += `**${key}**\n\``;
            let isFirst = true;
            for (let [name, value] of Object.entries(object[key].dice)) {
                if (isFirst) {
                    message += `${name} : ${value}`
                    isFirst = false;
                }
                else message += ` , ${name} : ${value}`;
            }
            message += "`\n";
        });
    }
    else {
        message += "（なし）\n\n";
    }
    
    return message;
}