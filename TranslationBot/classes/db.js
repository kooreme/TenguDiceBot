const { Pool } = require('pg');

class DB {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  async fetchChannels(from) {
    const q = {
      name : "fetch-channels",
      text : "SELECT to_channel,from_language,to_language FROM channels WHERE from_channel = $1;",
      values : [from],
    }
    //Promiseを返却
    return this._query(q).then(r => r.rows);
    
  }

  async setChannelPair(from,to,from_lang,to_lang,guildId) {
    const q = {
      name : "set-channel-pair",
      text : "INSERT INTO channels(from_channel,to_channel,from_language,to_language,guild_id) VALUES($1,$2,$3,$4,$5);",
      values : [from, to, from_lang, to_lang, guildId],
    }
    //Promiseを返却
    return this._query(q);
  }

  //
  async updateToChannelLanguage(from,to,from_lang,to_lang) {
    const q = {
      name : "update-channel-language",
      text : "UPDATE channels SET from_language = $3, to_language = $4 WHERE from_channel = $1 AND to_channel = $2;",
      values : [from, to, from_lang, to_lang],
    }
    //Promiseを返却
    return this._query(q);
  }

  //チャンネルペアを１つ削除する。
  async deleteChannelPair(from,to) {
    const q = {
      name : "delete-channel-pair",
      text : "DELETE FROM channels WHERE from_channel = $1 AND to_channel = $2;",
      values : [from, to],
    }
    //Promiseを返却
    return this._query(q);
  }

  //このチャンネルと連携する全ペアを解除する。
  async deleteAllChannelPair(from) {
    const q = {
      name : "delete-all-channel-pair",
      text : "DELETE FROM channels WHERE from_channel = $1;",
      values : [from],
    }
    //Promiseを返却
    return this._query(q);
  }

  //ギルド内の全ペアを削除する。
  async deleteAllChannelPairInGuild(guildId) {
    const q = {
      name : "delete-all-pair-in-guild",
      text : "DELETE FROM channels WHERE guild_id = $1;",
      values : [guildId],
    }
    //Promiseを返却
    return this._query(q);
  }

  //連携しているチャンネルのリストを取得する
  async getChannelPairList(from) {
    const q = {
      name : "get-channel-pair-list",
      text : "SELECT to_channel, from_language, to_language FROM channels WHERE from_channel = $1;",
      values : [from],
    }
    return this._query(q).then(r => r.rows);
  }

  //ChannelPairが存在していたらtrueを返す。存在しなかったらfalseを返す。
  async isExistChannelPair(from,to) {
    const q = {
      name : "delete-all-channel-pair",
      text : "SELECT COUNT(*) FROM channels WHERE from_channel = $1 AND to_channel = $2;",
      values : [from, to],
    }
    
    return this._query(q).then(r => !!(r.rows[0].count > 0));
  }

  async _query(q) {
    const query = await this.pool.query(q)
    .catch(e => {
      console.log(e);
      throw new Error();
    });
    //console.log(query);
    return query;
  }
}

module.exports = new DB();