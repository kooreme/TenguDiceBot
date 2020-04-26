const DB = require('./db');

const PUBLIC_CH_ID = '99';
const PUBLIC_DB = 'public_db';
const PRIVATE_DB = 'private_db';
const KOOREME_USER_ID = "452131837884628992";

class DataTable {
    constructor() {
        this.db = DB.DB;        
    }

    async getUserTable(channelID = null,tableName) {
        return await this._getTable(channelID ? PRIVATE_DB : PUBLIC_DB,channelID ? channelID : PUBLIC_CH_ID,tableName);
    }

    async _getTable(collectionName,channelID,tableName) {
        return await this.db.getData(collectionName,channelID,tableName);
    }

    async getAllTable (channelID) {
        let pub_get = this.db.getData(PUBLIC_DB,PUBLIC_CH_ID);
        let pri_get = this.db.getData(PRIVATE_DB,channelID);

        let promise = Promise.all([pub_get,pri_get]).then((values) => {
            let v = {};
            v.public = values[0];
            v.private = values[1];
            return v;
        }).catch((err) => console.log(err));

        let returnData = await promise;       
        return returnData;
    }
    
    async updateTableName (channelID = null,dataObject) {
        return await this._createTable(channelID, dataObject);
    }

    async createTable (tableName,channelID = null,guild_owner_id,author_id) {
        const dataObject = {
            [tableName] : {
                'dice' : {
                    'a' : '1d6'
                },
                'data' : {},
                'permission' : [
                    KOOREME_USER_ID,
                    guild_owner_id,
                    author_id
                ]
            }
        };
        return await this._createTable(channelID,dataObject);
    }

    async publishTable(dataObject){
        return await this._createTable(null,dataObject);
    }

    async _createTable(channelID = null, dataObject) {
        return await this.db.setData(channelID ? PRIVATE_DB : PUBLIC_DB,channelID ? channelID : PUBLIC_CH_ID, dataObject);
    }

    async updateDice(channelID = null,tableName,diceName,diceString) {
        return await this._updateTableNode(channelID,tableName,"dice",diceName,diceString);
    }

    async updateData(channelID = null,tableName,dataIndex,dataString) {
        return await this._updateTableNode(channelID,tableName,"data",dataIndex,dataString);
    }

    async _updateTableNode(channelID = null,tableName,tableNode,key,value) {
        const dataObject = {
            [tableName] : {
                [tableNode] : {
                    [key] : value
                }
            }
        };
        return await this.db.setData(channelID ? PRIVATE_DB : PUBLIC_DB,channelID ? channelID : PUBLIC_CH_ID, dataObject);
    }

    async updatePermission(channelID = null,tableName,permission) {
        const dataObject = {
            [tableName] : {
                "permission" : permission
            }
        }
        return await this.db.setData(channelID ? PRIVATE_DB : PUBLIC_DB,channelID ? channelID : PUBLIC_CH_ID, dataObject);
    }

    async deleteDice(channelID = null,tableName,diceName) {
        return await this._deleteTableNode(channelID,tableName,"dice",diceName);
    }
    async deleteData(channelID = null,tableName,dataIndex) {
        return await this._deleteTableNode(channelID,tableName,"data",dataIndex);
    }

    async _deleteTableNode(channelID = null,tableName,tableNode,key) {
        const dataObject = {
            [tableName] : {
                [tableNode] : {
                    [key] : this.db.delete
                }
            }
        }
        return await this.db.setData(channelID ? PRIVATE_DB : PUBLIC_DB,channelID ? channelID : PUBLIC_CH_ID, dataObject);
    }

    async deleteTable(channelID = null,tableName) {
        const dataObject = {
            [tableName] : this.db.delete
        }
        return await this.db.setData(channelID ? PRIVATE_DB : PUBLIC_DB,channelID ? channelID : PUBLIC_CH_ID, dataObject);
    }
}

module.exports.db = new DataTable();