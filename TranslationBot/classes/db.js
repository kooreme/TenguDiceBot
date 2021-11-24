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

  async updateToChannelLanguage(from,to,to_lang) {
    const q = {
      name : "update-channel-language",
      text : "UPDATE channels SET language = $3 WHERE from_channel = $1 AND to_channel = $2;",
      values : [from,to,to_lang],
    }
    //Promiseを返却
    return this._query(q);
  }

  async deleteChannelPair(from,to) {
    const q = {
      name : "delete-channel-pair",
      text : "DELETE FROM channels WHERE from_channel = $1 AND to_channel = $2;",
      values : [from,to],
    }
    //Promiseを返却
    return this._query(q);
  }

  async deleteAllChannelPair(from) {
    const q = {
      name : "delete-all-channel-pair",
      text : "DELETE FROM channels WHERE from_channel = $1;",
      values : [from],
    }
    //Promiseを返却
    return this._query(q);
  }

  //ChannelPairが存在していたらtrueを返す。存在しなかったらfalseを返す。
  async isExistChannelPair(from,to) {
    const q = {
      name : "delete-all-channel-pair",
      text : "SELECT COUNT(*) FROM channels WHERE from_channel = $1 AND to_channel = $2;",
      values : [from,to],
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