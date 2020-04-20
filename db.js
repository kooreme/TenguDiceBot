const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter_default = new FileSync('.defaultdata/db.json');
const adapter_userdata = new FileSync('.data/db.json');
const db_default = low(adapter_default);
const db_userdata = low(adapter_userdata);
const nd_dataTable = require('./nd_datatable');
const kt_dataTable = require('./kt_datatable');
const Log = require('./log');

const PUBLIC_CH_ID = '99';
const PUBLIC_DB = 'public_db';
const PRIVATE_DB = 'private_db';
const KOOREME_USER_ID = "452131837884628992";

class DataTable {
    constructor() {
        this.ND_DATATABLE = '0';
        this.KT_DATATABLE = '1';
        this._init();
    }

    _init() {
        db_default.defaults({'db' : []}).write();
        if (db_default.get('db').filter({'channelID' : this.ND_DATATABLE}).value().length == 0) db_default.get('db').push({'channelID' : this.ND_DATATABLE, 'tables' : nd_dataTable.dataTable }).write();
        if (db_default.get('db').filter({'channelID' : this.KT_DATATABLE}).value().length == 0) db_default.get('db').push({'channelID' : this.KT_DATATABLE, 'tables' : kt_dataTable.dataTable }).write();
        db_userdata.defaults({ [PUBLIC_DB] : [{'channelID' : '99','tables' : {}}], [PRIVATE_DB] : []}).write();
    }

    getDefaultTable(channelID,tableName) {
        return this._getTable(channelID,tableName,'db',db_default);
    }
    getUserTable(channelID = null,tableName) {
        return this._getTable(channelID ? channelID : PUBLIC_CH_ID,tableName,channelID ? PRIVATE_DB : PUBLIC_DB,db_userdata);
    }

    getAllTable (channelID) {
        let public_table = null;
        let private_table = null;
        try {
            public_table = 
            db_userdata.get(PUBLIC_DB)
            .filter({'channelID' : PUBLIC_CH_ID})
            .find("tables")
            .get("tables")
            .value();

            private_table = 
            db_userdata.get(PRIVATE_DB)
            .filter({'channelID' : channelID})
            .find("tables")
            .get("tables")
            .value();

            return { "public" : public_table, "private" : private_table };

        } catch(e) {
            return null;
        }
    }

    _getTable(channelID,tableName,DBName,adapter) {
        let table = null;
        try {
            table = adapter.get(DBName)
            .filter({'channelID' : channelID})
            .find("tables")
            .find(tableName)
            .get(tableName)
            .value();

            return table;
        }catch(e) {
            return null;
        }
    }

    findChannel(channelID = null) {
        let ch;
        try {
            ch = db_userdata.get(channelID ? [PRIVATE_DB] : [PUBLIC_DB])
            .filter({'channelID' : (channelID ? channelID : PUBLIC_CH_ID)})
            .value();
            Log.prints('findChannel:ch = ' + ch);
            if (!ch || ch.length == 0) return false;
            return true;
        }catch(e) {
            return false;
        }
    }

    createChannel(channelID) {
        try {
            let col = db_userdata.get([PRIVATE_DB]);
            col.push({'channelID' : channelID,'tables' : {}}).write();
            return true;
        }catch(e) {
            return false;
        }
    }
    
    updateTableName (channelID = null,dataObject) {
        return this._createTable(channelID, dataObject);
    }

    createTable (tableName,channelID = null,guild_owner_id,author_id) {
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
        return this._createTable(channelID,dataObject);
    }

    publishTable(dataObject){
        return this._createTable(null,dataObject);
    }

    _createTable(channelID = null, dataObject) {
        try {
            db_userdata.get(channelID ? [PRIVATE_DB] : [PUBLIC_DB])
            .filter({'channelID' : (channelID ? channelID : PUBLIC_CH_ID)})
            .find("tables")
            .get("tables")
            .assign(dataObject)
            .write();

            return true;
        } catch(e) {
            return false;
        }
    }
    getPermission(channelID = null,tableName){
        let array;
        try {
            array = db_userdata.get(channelID ? [PRIVATE_DB] : [PUBLIC_DB])
            .filter({'channelID' : (channelID ? channelID : PUBLIC_CH_ID)})
            .find("tables")
            .find(tableName)
            .find("permission")
            .get("permission")
            .value();

            return array;
        } catch(e) {
            return null;
        }
    }
    updateDice(channelID = null,tableName,diceName,diceString) {
        return this._updateTableNode(channelID,tableName,"dice",diceName,diceString);
    }
    updateData(channelID = null,tableName,dataIndex,dataString) {
        return this._updateTableNode(channelID,tableName,"data",dataIndex,dataString);
    }

    _updateTableNode(channelID = null,tableName,tableNode,key,value) {
        try {
            db_userdata.get(channelID ? [PRIVATE_DB] : [PUBLIC_DB])
            .filter({'channelID' : (channelID ? channelID : PUBLIC_CH_ID)})
            .find("tables")
            .get("tables." + tableName + "." + tableNode)
            .assign({[key] : value})
            .write();
            return true;
        }catch(e) {
            return false;
        }
    }

    addPermission(channelID = null,tableName,userID) {
        try {
            db_userdata.get(channelID ? [PRIVATE_DB] : [PUBLIC_DB])
            .filter({'channelID' : (channelID ? channelID : PUBLIC_CH_ID)})
            .find("tables")
            .find(tableName)
            .find("permission")
            .get("permission")
            .push(userID)
            .write();
            return true;
        }catch(e) {
            return false;
        }
    }

    deleteDice(channelID = null,tableName,diceName) {
        return this._deleteTableNode(channelID,tableName,"dice",diceName);
    }
    deleteData(channelID = null,tableName,dataIndex) {
        return this._deleteTableNode(channelID,tableName,"data",dataIndex);
    }

    _deleteTableNode(channelID = null,tableName,tableNode,key) {
        try {
            db_userdata.get(channelID ? [PRIVATE_DB] : [PUBLIC_DB])
            .filter({'channelID' : (channelID ? channelID : PUBLIC_CH_ID)})
            .find("tables")
            .get("tables." + tableName + "." + tableNode)
            .unset(key)
            .write();
            return true;
        }catch(e) {
            return false;
        }
    }
    deletePermission(channelID = null,tableName,userID) {
        try {
            db_userdata.get(channelID ? [PRIVATE_DB] : [PUBLIC_DB])
            .filter({'channelID' : (channelID ? channelID : PUBLIC_CH_ID)})
            .find("tables")
            .find(tableName)
            .find("permission")
            .get("permission")
            .remove((n) => {return n == userID})
            .write();
            return true;
        }catch(e) {
            return false;
        }
    }

    deleteTable(channelID = null,tableName) {
        try {
            db_userdata.get(channelID ? [PRIVATE_DB] : [PUBLIC_DB])
            .filter({'channelID' : (channelID ? channelID : PUBLIC_CH_ID)})
            .find("tables")
            .get("tables")
            .unset(tableName)
            .write();
            return true;
        }catch(e) {
            return false;
        }
    }
}

module.exports.db = new DataTable();