/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const error = require('../util/errormessage');
const Command = {
    'addpermission' : require('./addPermission'),
    'checktabledata' : require('./checkTableData'),
    'checktablelist' : require('./checkTableList'),
    'createtable' : require('./createTable'),
    'deletedice' : require('./deleteDice'),
    'deletedata' : require('./deleteData'),
    'deletepermission' : require('./deletePermission'),
    'deletetable' : require('./deleteTable'),
    'help' : require('./help'),
    'publishtable' : require('./publishTable'),
    'updatedice' : require('./updateDice'),
    'updatedata' : require('./updateData'),
    'updatetablename' : require('./updateTableName'),
}

/**
 * コマンドを解釈し、実行する。
 * コマンドを実行できる正しい文字列であるかを
 * チェックし、問題なければ各コマンドを実行する。
 */
exports.run = async function(message,content){
    content = content.replace(/(?<!\\)\x20/g,"");
    let split = content.split(/(?<!\\),/);

    const command = Command[split[0].toLowerCase()];
    //コマンドチェック
    if (command == null)  return error.replyErrorMessage('コマンドが見つかりませんでした。');

    //そのコマンドの内容チェック。エラーだと文章が返ってくる
    const check = command.check(split);
    if (check != null) return error.replyErrorMessage(check);

    //各コマンドごとのデータに整形し、実行。実行結果を返す。
    const run = await command.run(message,command.adjust(split));
    if (run.result === false) return error.replyErrorMessage(run.message);
    else return run.message;
}