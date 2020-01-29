const error = require('./errormessage.js');
const Log = require('./log.js');
const PG = require('./postgres.js');

const SEPARATOR = /、/g;

const M_PLUSNUMBER = /^m\+\d+$/;
const M_MINUSNUMBER = /^m-\d+$/;
const I_PLUSITEM = /^i\+.+$/;
const I_MINUSITEM = /^i-.+$/;

exports.receiveResponce = async function (message, content) {
    content = content.replace(/\s+/g, '');
    const splitRequestArray = splitRequest(content);
    Log.printsDir(splitRequestArray,true);

    let returnString = '';
    switch(splitRequestArray[0]) {
        case 'm' :
            Log.prints('case m',true);
            returnString = await recordMoney(message,splitRequestArray);
            break;
        case 'i' :
            returnString = await recordItem(message,splitRequestArray);
            break;
        case 'reset':
        case 'delete':
            returnString = await deleteRecord(message);
            break;
        case 'result' :
        case 'end' :
            returnString = await getRecordResult(message);
            break;
        case 'check' :
            returnString = await getRecord(message);
            break;
        default :
            returnString = error.replyErrorMessage();
    }

    return returnString;
}

function splitRequest(content) {
    let splitArray = '';

    if(M_PLUSNUMBER.test(content)) {
        splitArray = content.split('+');
        splitArray[1] = parseInt(splitArray[1]);
    }
    else if(M_MINUSNUMBER.test(content)) {
        splitArray = content.split('-');
        splitArray[1] *= -1;
    }
    else if(I_PLUSITEM.test(content)) {
        splitArray = content.split('+');
        splitArray.push(true);
    }
    else if(I_MINUSITEM.test(content)) {
        splitArray = content.split('-');
        splitArray.push(false);
    }
    else {
        splitArray = [ content ];
    }
    return splitArray;
}

async function recordMoney(message,array) {
    if (!array[1]) return error.replyErrorMessage();
    const result = await PG.saveRecord({channel_id : message.channel.id, money : array[1]});
    return result == null ? error.replyErrorMessage() :
    '万札を更新しました。現万札：**' + result.sum_money + '**  アイテム：' + (result.item_record ? '**' + result.item_record + '**' : 'なし');
}

async function recordItem(message,array) {
    if (!array[1]) return error.replyErrorMessage();
    const result = await PG.saveRecord({channel_id : message.channel.id, item : array[1], isItemAdd : array[2]});
    return result == null ? error.replyErrorMessage() :
    'アイテムを更新しました。現万札：**' + result.sum_money + '**  アイテム：' + (result.item_record ? '**' + result.item_record + '**' : 'なし');
}

async function deleteRecord(message) {
    const result = await PG.delete(message.channel.id);
    return !result ? error.replyErrorMessage() : result;
}

async function getRecordResult(message) {
    const result = await PG.getRecord(message.channel.id);
    if (!result) return 'このチャンネル内の記録が見つかりません。'; 
    
    if (result.money_record) result.money_record = result.money_record.replace(SEPARATOR, ' + ').replace(/\s\+\s-/g,' - ');

    let returnString = '結果…… 現万札：**' + result.sum_money + '**  アイテム：' + (result.item_record ? '**' + result.item_record +'**' : 'なし');
    if(result.money_record) returnString += '\n' + '入出金記録：**' + result.money_record + ' = ' + result.sum_money + '**';

    const deleted = await PG.delete(message.channel.id);
    if (!deleted) returnString = error.replyErrorMessage();
    else returnString += '\n\n' + deleted;

    return returnString;
}

async function getRecord(message) {
    const result = await PG.getRecord(message.channel.id);
    if (!result) return 'このチャンネル内の記録が見つかりません。'; 
    
    if (result.money_record) result.money_record = result.money_record.replace(SEPARATOR, ' + ').replace(/\s\+\s-/g,' - ');

    let returnString = '現在の状況…… 現万札：**' + result.sum_money + '**  アイテム：' + (result.item_record ? '**' + result.item_record + '**' : 'なし');
    if(result.money_record) returnString += '\n' + '入出金記録：**' + result.money_record + ' = ' + result.sum_money + '**';

    return returnString;

}