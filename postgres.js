const Log = require('./log.js');
/* eslint-disable no-undef */
const { Pool } = require('pg');

const SEPARATOR = '、';

const pgPool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
  max: 20,
});

async function connect() {
  return await pgPool.connect();
}

exports.saveRecord = async function ({channel_id,user_id=null,money=0,item = null, isItemAdd = true} = {}) {
  if(channel_id == null) return null;
  else channel_id = String(channel_id);
  const client = await connect();
  Log.printsDir(client);
  if (client == null) return null;
  let record = null;
  try {
    await client.query('BEGIN');
    record = await client.query('SELECT * FROM "public".bank_record WHERE channel_id = $1', [channel_id]);
    Log.printsDir(record);

    //データなし（INSERT）
    if (record.rowCount == 0) {
      Log.prints('No Record was found.',true);
      let money_record = null;
      if (money != 0) money_record = money;
      let values = [
        channel_id,
        user_id,
        money,
        money_record, 
        item
      ];
      await client.query('INSERT INTO "public".bank_record(channel_id , user_id , sum_money , money_record , item_record) VALUES ($1,$2,$3,$4,$5);',values);
    }
    //データ有り（UPDATE）
    else {
      Log.prints('Records were found.',true);
      let sum_money = money + record.rows[0].sum_money;             //合計金額
      let money_record = record.rows[0].money_record; //金額入力履歴
      if (money != 0) {
        if (money_record) money_record += SEPARATOR + money;
        else money_record = money;
      }
      Log.prints('record.rows[0].item_record = "' + record.rows[0].item_record + '", Type : ' + typeof record.rows[0].item_record,true);
      let item_record = record.rows[0].item_record == null ? '' : record.rows[0].item_record;
      Log.prints('Before:  item_record = "' + item_record + '", Type : ' + typeof item_record,true);

      if (isItemAdd) {
        if (item != null) item_record += SEPARATOR + item;
      }
      else {
        if (item_record.indexOf(item) == -1) {
          Log.prints('The Item has not found in the record.',true);
          throw e = 'そのアイテムの記録はありません。';
        }
        item_record = item_record.replace(item, '');
      }
      //アイテムレコードの先頭が','だったら消去
      if (item_record.substring(0,1) == SEPARATOR) item_record = item_record.substring(1);
      
      Log.prints('After: item_record = "' + item_record + '", Type : ' + typeof item_record,true);
      
      if (!item_record) item_record = null;
      let values = [channel_id,sum_money,money_record,item_record];
      await client.query('UPDATE "public".bank_record SET sum_money = $2, money_record = $3, item_record = $4 WHERE channel_id = $1' , values);
    }
    await client.query('COMMIT');
    record = await client.query('SELECT * FROM "public".bank_record WHERE channel_id = $1', [channel_id]);

  } catch (e) {
    await client.query('ROLLBACK');
    Log.printsDir(e,true);
    return typeof e == 'string' ? e : null;
  } finally {
    client.release();
    Log.prints('client released.',true);
  }
  return record.rows[0];
}

exports.delete = async function(channel_id) {
  if (!channel_id) return null;
  else channel_id = String(channel_id);
  const client = await connect();
  Log.printsDir(client);
  if (client == null) return null;

  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM "public".bank_record WHERE channel_id = $1' , [channel_id]);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    Log.printsDir(e,true);
    return typeof e == 'string' ? e : null;
  } finally {
    client.release();
    Log.prints('client released.',true);
  }
  return 'チャンネル内の記録をリセットしました。';
}

exports.getRecord = async function(channel_id) {
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
    Log.printsDir(e,true);
    return typeof e == 'string' ? e : null;
  } finally {
    client.release();
    Log.prints('client released.',true);
  }
  return record.rows[0];
}
