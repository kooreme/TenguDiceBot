const DB = require('./db');

const SEPARATOR = '、';
const COLLECTION_TB = 'tengu-bank'

class TenguBankDataTable {
  constructor() {

  }

  async saveRecord({ channel_id, user_id = null, money = 0, item = null, isItemAdd = true } = {}) {
    let data = await DB.DB.getData(COLLECTION_TB,channel_id);
    if (!data) {  //データなし、新規作成
      const dataObject = {
        "user_id" : user_id,
        "sum_money" : money,
        "money_record" : String(money),
        "item_record" : item ? String(item) : ""
      }
      let setData = await DB.DB.setData(COLLECTION_TB,channel_id,dataObject);
      return setData ? dataObject : null;
    }
    else {//データあり、追加
      data.sum_money += money;//合計金額
      if (money != 0)  {  //金額履歴
       if (data.money_record) data.money_record += SEPARATOR + money;
       else data.money_record = String(money);
      }
      if (isItemAdd) { //アイテム追加
        if(item != null) data.item_record += SEPARATOR + item;
      }
      else { //アイテム削除
        let rec_split;
        if (data.item_record) rec_split = String(data.item_record).split(SEPARATOR);
        if (!rec_split || checkRecSplit(rec_split, item) == false) {
          return null;
        }
        data.item_record = String(data.item_record).replace(item, '');
      }
      //アイテムレコードの先頭が','だったら消去
      if (data.item_record && String(data.item_record).substring(0, 1) == SEPARATOR) {
        data.item_record = data.item_record.substring(1);
      }
      //アイテムレコード文字列中にセパレータが連続していたら一つにまとめる
      data.item_record = data.item_record.replace(new RegExp(SEPARATOR + SEPARATOR, 'g'), SEPARATOR);
      //末尾がセパレータだったら消去
      if (data.item_record.substring(data.item_record.length - 1) == SEPARATOR) {
        data.item_record = data.item_record.substring(0, data.item_record.length - 1);
      }
      const setData = await DB.DB.setData(COLLECTION_TB,channel_id,data);
      return setData ? data : null;
    }
  }

  async getRecord(channel_id) {
    let result = await DB.DB.getData(COLLECTION_TB, channel_id);
    return result ? result : null;

  }

  async delete(channel_id) {
    let result = await DB.DB.deleteChannel(COLLECTION_TB,channel_id);
    
    return result ? 'チャンネル内の記録をリセットしました。' : 'チャンネルの削除に失敗しました。';
  }

}

module.exports.TB = new TenguBankDataTable();

function checkRecSplit(recArray, item) {
  let flag = false;
  recArray.forEach(elm => {
    if (elm == item) {
      flag = true;
      return;
    }
  });
  return flag;
}

/*
exports.saveRecord = async function ({ channel_id, user_id = null, money = 0, item = null, isItemAdd = true } = {}) {
  if (channel_id == null) return null;
  else channel_id = String(channel_id);
  const client = await connect();
  Log.printsDir(client);
  if (client == null) return null;
  let record = null;
  let error = null;
  try {
    await client.query('BEGIN');
    record = await client.query('SELECT * FROM "public".bank_record WHERE channel_id = $1', [channel_id]);
    Log.printsDir(record);

    //データなし（INSERT）
    if (record.rowCount == 0) {
      Log.prints('No Record was found.', true);
      let money_record = null;
      if (money != 0) money_record = money;
      let values = [
        channel_id,
        user_id,
        money,
        money_record,
        item
      ];
      await client.query('INSERT INTO "public".bank_record(channel_id , user_id , sum_money , money_record , item_record) VALUES ($1,$2,$3,$4,$5);', values);
    }
    //データ有り（UPDATE）
    else {
      Log.prints('Records were found.', true);
      let sum_money = money + record.rows[0].sum_money;             //合計金額
      let money_record = record.rows[0].money_record; //金額入力履歴
      if (money != 0) {
        if (money_record) money_record += SEPARATOR + money;
        else money_record = money;
      }
      Log.prints('record.rows[0].item_record = "' + record.rows[0].item_record + '", Type : ' + typeof record.rows[0].item_record, true);
      let item_record = record.rows[0].item_record == null ? '' : record.rows[0].item_record;
      Log.prints('Before:  item_record = "' + item_record + '", Type : ' + typeof item_record, true);

      if (isItemAdd) {
        if (item != null) item_record += SEPARATOR + item;
      }
      else {
        let rec_split;
        if (item_record) rec_split = item_record.split(SEPARATOR);
        if (!rec_split || checkRecSplit(rec_split, item) == false) {
          Log.prints('The Item has not found in the record.', true);
          throw new Error.NoItemError('そのアイテムの記録はありません。');
        }
        item_record = item_record.replace(item, '');
      }
      //アイテムレコードの先頭が','だったら消去
      if (item_record.substring(0, 1) == SEPARATOR) {
        item_record = item_record.substring(1);
      }
      //アイテムレコード文字列中にセパレータが連続していたら一つにまとめる
      item_record = item_record.replace(new RegExp(SEPARATOR + SEPARATOR, 'g'), SEPARATOR);
      //末尾がセパレータだったら消去
      if (item_record.substring(item_record.length - 1) == SEPARATOR) {
        item_record = item_record.substring(0, item_record.length - 1);
      }

      Log.prints('After: item_record = "' + item_record + '", Type : ' + typeof item_record, true);

      if (!item_record) item_record = null;
      let values = [channel_id, sum_money, money_record, item_record];
      await client.query('UPDATE "public".bank_record SET sum_money = $2, money_record = $3, item_record = $4 WHERE channel_id = $1', values);
    }
    await client.query('COMMIT');
    record = await client.query('SELECT * FROM "public".bank_record WHERE channel_id = $1', [channel_id]);

  } catch (e) {
    await client.query('ROLLBACK');
    Log.printsDir(e, true);
    error = e;
  } finally {
    client.release();
    Log.prints('client released.', true);
  }
  return error ? error : record.rows[0];
}

exports.delete = async function (channel_id) {
  if (!channel_id) return null;
  else channel_id = String(channel_id);
  const client = await connect();
  Log.printsDir(client);
  if (client == null) return null;

  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM "public".bank_record WHERE channel_id = $1', [channel_id]);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    Log.printsDir(e, true);
    return typeof e == 'string' ? e : null;
  } finally {
    client.release();
    Log.prints('client released.', true);
  }
  return 'チャンネル内の記録をリセットしました。';
}
exports.getRecord = async function (channel_id) {
  if (!channel_id) return null;
  else channel_id = String(channel_id);
  const client = await connect();
  Log.printsDir(client);
  if (client == null) return null;
  let record = null;
  try {
    record = await client.query('SELECT * FROM "public".bank_record WHERE channel_id = $1', [channel_id]);
    Log.printsDir(record);
  } catch (e) {
    Log.printsDir(e, true);
    return typeof e == 'string' ? e : null;
  } finally {
    client.release();
    Log.prints('client released.', true);
  }
  return record.rows[0];
}
*/