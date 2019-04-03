const Log = require('./log.js');
const datatable = require('./kt_datatable');
const error = require('./errormessage.js');

exports.receiveQuest = function(string) {
    const returnString = (string in datatable.tableQuest) ? outputQuest(datatable.tableQuest[string]) : error.replyErrorMessage();
    return returnString;
};

function outputQuest(quest) {
    let string = '';
    string += '\n\n**◆◆　クエスト　◆◆**\n';
    string += '\n**' + quest.name + '**\n\n';
    string += '**経験点**：' + quest.exp + '\n';
    string += '**公開条件**：' + quest.opened_conditions + '\n\n';
    string += '**イベント**：\n' + quest.events + '\n\n';
    string += '**ジャッジ**：' + quest.judge_roll +'\n';
    string += '**クリア条件**：' + quest.clear_conditions +'\n';
    string += '**報酬**' + quest.reward + '\n';

    return string;
}
