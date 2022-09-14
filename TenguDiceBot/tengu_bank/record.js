/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const error = require("../util/errormessage");
const Log = require("../util/log");
const TB = require("./tb_db_wrapper");

const SEPARATOR = /、/g;

const M_PLUSNUMBER = /^m\+\d+$/;
const M_MINUSNUMBER = /^m-\d+$/;
const I_PLUSITEM = /^i\+.+$/;
const I_MINUSITEM = /^i-.+$/;

exports.receiveResponce = async function (content, channelID) {
    content = content.replace(/\s+/g, "");
    const splitRequestArray = splitRequest(content);
    Log.printsDir(splitRequestArray, true);

    let returnString = "";
    switch (splitRequestArray[0]) {
        case "m":
            returnString = await recordMoney(channelID, splitRequestArray);
            break;
        case "i":
            returnString = await recordItem(channelID, splitRequestArray);
            break;
        case "reset":
        case "delete":
            returnString = await deleteRecord(channelID);
            break;
        case "result":
        case "end":
            returnString = await getRecordResult(channelID);
            break;
        case "check":
            returnString = await getRecord(channelID);
            break;
        default:
            returnString = error.replyErrorMessage();
    }

    return returnString;
};

function splitRequest(content) {
    let splitArray = "";

    if (M_PLUSNUMBER.test(content)) {
        splitArray = content.split("+");
        splitArray[1] = parseInt(splitArray[1]);
    } else if (M_MINUSNUMBER.test(content)) {
        splitArray = content.split("-");
        splitArray[1] *= -1;
    } else if (I_PLUSITEM.test(content)) {
        splitArray = [];
        splitArray.push(content.substring(0, 1));
        splitArray.push(content.substring(2));
        splitArray[1] = escapingMarkDown(splitArray[1]);
        splitArray.push(true);
    } else if (I_MINUSITEM.test(content)) {
        splitArray = [];
        splitArray.push(content.substring(0, 1));
        splitArray.push(content.substring(2));
        splitArray[1] = escapingMarkDown(splitArray[1]);
        splitArray.push(false);
    } else {
        splitArray = [content];
    }
    return splitArray;
}

function escapingMarkDown(str) {
    const after = str.replaceAll(/[*_~|\\`>]/g, "\\$&");
    //console.log("before = %s, after = %s", str, after);
    return after;
}

async function recordMoney(channelID, array) {
    if (!array[1]) return error.replyErrorMessage();
    const result = await TB.TB.saveRecord({
        channel_id: channelID,
        money: array[1],
    }).catch(() => {
        return null;
    });
    return result == null
        ? error.replyErrorMessage()
        : "万札を更新しました。現万札：**" +
              change893(result.sum_money) +
              "**  アイテム：" +
              (result.item_record ? "**" + result.item_record + "**" : "なし");
}

async function recordItem(channelID, array) {
    if (!array[1]) return error.replyErrorMessage();
    const result = await TB.TB.saveRecord({
        channel_id: channelID,
        item: array[1],
        isItemAdd: array[2],
    }).catch(() => {
        return null;
    });
    if (!result) return "そのアイテムの記録はありません。";

    return result == null
        ? error.replyErrorMessage()
        : "アイテムを更新しました。現万札：**" +
              change893(result.sum_money) +
              "**  アイテム：" +
              (result.item_record ? "**" + result.item_record + "**" : "なし");
}

async function deleteRecord(channelID) {
    const result = await TB.TB.delete(channelID);
    return result;
}

async function getRecordResult(channelID) {
    const result = await TB.TB.getRecord(channelID).catch(() => {
        return null;
    });
    if (!result) return "このチャンネル内の記録が見つかりません。";

    if (result.money_record)
        result.money_record = String(result.money_record)
            .replace(SEPARATOR, " + ")
            .replace(/\s\+\s-/g, " - ");

    let returnString =
        "結果…… 現万札：**" +
        change893(result.sum_money) +
        "**  アイテム：" +
        (result.item_record ? "**" + result.item_record + "**" : "なし");
    if (result.money_record)
        returnString +=
            "\n" +
            "入出金記録：**" +
            result.money_record +
            " = " +
            change893(result.sum_money) +
            "**";

    const deleted = await TB.TB.delete(channelID).catch(() => {
        return null;
    });
    if (!deleted) returnString = error.replyErrorMessage();
    else returnString += "\n\n" + deleted;

    return returnString;
}

async function getRecord(channelID) {
    const result = await TB.TB.getRecord(channelID).catch(() => {
        return null;
    });
    if (!result) return "このチャンネル内の記録が見つかりません。";
    Log.prints(result.money_record);
    if (result.money_record)
        result.money_record = String(result.money_record)
            .replace(SEPARATOR, " + ")
            .replace(/\s\+\s-/g, " - ");

    let returnString =
        "現在の状況…… 現万札：**" +
        change893(result.sum_money) +
        "**  アイテム：" +
        (result.item_record ? "**" + result.item_record + "**" : "なし");
    if (result.money_record)
        returnString +=
            "\n" +
            "入出金記録：**" +
            result.money_record +
            " = " +
            change893(result.sum_money) +
            "**";

    return returnString;
}

function change893(money) {
    if (String(money).indexOf("893") !== -1) {
        money = ":japanese_goblin:  " + money + "  :japanese_goblin:";
    }
    return money;
}
