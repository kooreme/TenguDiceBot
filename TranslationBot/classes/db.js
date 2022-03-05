const { Pool } = require("pg");

class DB {
    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });
    }

    /**
     * @typedef Record
     * @property {string} from_channel
     * @property {string} to_channel
     * @property {string} from_language
     * @property {string} to_language
     */

    /**
     * 連携元のchannelIdを指定し，該当するすべての連携を返します．
     * @param {string} from 連携元のchannelIdです．
     * @returns {Pick<Record, 'to_channel' | 'from_language' | 'to_language'>[]}
     */
    async fetchChannels(from) {
        const q = {
            name: "fetch-channels",
            text: "SELECT to_channel,from_language,to_language FROM channels WHERE from_channel = $1;",
            values: [from],
        };
        //Promiseを返却
        return this._query(q).then((r) => r.rows);
    }

    /**
     * 新しい連携を作成します．
     * @param {string} from 連携元のchannelIdです．
     * @param {string} to 連携先のchannelIdです．
     * @param {string} from_lang 翻訳元の言語です．
     * @param {string} to_lang 翻訳先の言語です．
     * @param {string} guildId
     * @returns // 不明
     */
    async setChannelPair(from, to, from_lang, to_lang, guildId) {
        const q = {
            name: "set-channel-pair",
            text: "INSERT INTO channels(from_channel,to_channel,from_language,to_language,guild_id) VALUES($1,$2,$3,$4,$5);",
            values: [from, to, from_lang, to_lang, guildId],
        };
        //Promiseを返却
        return this._query(q);
    }

    /**
     * 存在する連携を更新します．
     * @param {string} from 連携元のchannelIdです．
     * @param {string} to 連携先のchannelIdです．
     * @param {string} from_lang 翻訳元の言語です．
     * @param {string} to_lang 翻訳先の言語です．
     * @returns // 不明
     */
    async updateToChannelLanguage(from, to, from_lang, to_lang) {
        const q = {
            name: "update-channel-language",
            text: "UPDATE channels SET from_language = $3, to_language = $4 WHERE from_channel = $1 AND to_channel = $2;",
            values: [from, to, from_lang, to_lang],
        };
        //Promiseを返却
        return this._query(q);
    }

    /**
     * チャンネルペアを１つ削除します．
     * @param {string} from 連携元のchannelIdです．
     * @param {string} to 連携先のchannelIdです．
     * @returns // 不明
     */
    async deleteChannelPair(from, to) {
        const q = {
            name: "delete-channel-pair",
            text: "DELETE FROM channels WHERE from_channel = $1 AND to_channel = $2;",
            values: [from, to],
        };
        //Promiseを返却
        return this._query(q);
    }

    /**
     * あるチャンネルと連携する全ペアを解除します．
     * @param {string} from 連携元のchannelIdです．
     * @returns // 不明
     */
    async deleteAllChannelPair(from) {
        const q = {
            name: "delete-all-channel-pair",
            text: "DELETE FROM channels WHERE from_channel = $1;",
            values: [from],
        };
        //Promiseを返却
        return this._query(q);
    }

    /**
     * ギルド内の全ペアを削除します．
     * @param {string} guildId
     * @returns // 不明
     */
    async deleteAllChannelPairInGuild(guildId) {
        const q = {
            name: "delete-all-pair-in-guild",
            text: "DELETE FROM channels WHERE guild_id = $1;",
            values: [guildId],
        };
        //Promiseを返却
        return this._query(q);
    }

    /**
     * あるチャンネルから連携しているチャンネルのリストを取得します．
     * @param {string} from 連携元のchannelIdです．
     * @returns {Pick<Record, 'to_channel' | 'from_language' | 'to_language'>[]}
     */
    async getChannelPairList(from) {
        const q = {
            name: "get-channel-pair-list",
            text: "SELECT to_channel, from_language, to_language FROM channels WHERE from_channel = $1;",
            values: [from],
        };
        return this._query(q).then((r) => r.rows);
    }

    /**
     * 2チャンネル間に連携があるかどうかを返します．
     * @param {string} from 連携元のchannelIdです．
     * @param {string} to 連携先のchannelIdです．
     * @returns ChannelPairが存在していたらtrue，存在しなければfalseです．
     */
    async isExistChannelPair(from, to) {
        const q = {
            name: "delete-all-channel-pair",
            text: "SELECT COUNT(*) FROM channels WHERE from_channel = $1 AND to_channel = $2;",
            values: [from, to],
        };

        return this._query(q).then((r) => !!(r.rows[0].count > 0));
    }

    /**
     * クエリを実行します．
     * @param {import('pg').QueryConfig} q
     * @returns クエリの結果です．
     */
    async _query(q) {
        const query = await this.pool.query(q).catch((e) => {
            console.log(e);
            throw new Error();
        });
        //console.log(query);
        return query;
    }
}

module.exports = new DB();
