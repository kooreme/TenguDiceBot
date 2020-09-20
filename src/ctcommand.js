/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const error = require('./errormessage');
const Command = {
    'addpermission' : require('./ct_command/addPermission'),
    'checktabledata' : require('./ct_command/checkTableData'),
    'checktablelist' : require('./ct_command/checkTableList'),
    'createtable' : require('./ct_command/createTable'),
    'deletedice' : require('./ct_command/deleteDice'),
    'deletedata' : require('./ct_command/deleteData'),
    'deletepermission' : require('./ct_command/deletePermission'),
    'deletetable' : require('./ct_command/deleteTable'),
    'help' : require('./ct_command/help'),
    'publishtable' : require('./ct_command/publishTable'),
    'updatedice' : require('./ct_command/updateDice'),
    'updatedata' : require('./ct_command/updateData'),
    'updatetablename' : require('./ct_command/updateTableName'),
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