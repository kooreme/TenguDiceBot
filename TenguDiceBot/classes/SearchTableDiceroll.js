const DiceRoll = require('./diceroll');
const DB = require('../DB/db_wrapper');
const util = require('../util/util');
const Log = require('../util/log');



class SearchTableDiceRoll extends DiceRoll {
    
    constructor(string, datatable, message) {
        super(string);
        this.datatable = datatable;
		this.message = message;
    }

    async getTableData(tableName) {
		//default -> private -> publicで検索。
		let checkDataTable = this.datatable.dataTable[tableName.toLowerCase()];
		if (!checkDataTable) checkDataTable = await DB.db.getUserTable(this.message.channel.id, tableName);
		if (!checkDataTable) checkDataTable = await DB.db.getUserTable(null, tableName);
		return checkDataTable;
	}

	async checkTable(string) {
		let tempString = string;

		let tableName;
		let returnString = '';
		let diceKind = 'a';
		let additionValue;
		Log.prints("before spellCheck : " + tempString);
		tempString = util.spellCheck(tempString);
		Log.prints("after spellCheck : " + tempString);
		
		let temp = tempString.split(',');
		diceKind = temp[1] ? temp[1] : 'a';
		tableName = temp[0];
		additionValue = temp[2];
		
		let checkDataTable;
		//テーブル名は半角英数禁止のため、最初の文字が半角英数ならテーブル検索は不要。
		//ただし、wasshoiまたはnrsの文字が最初にある場合は検索する。（wasshoiエントリー、NRS発狂）
		//検索スキップにより、パフォーマンスを向上させる。
		if (!/^[a-zA-Z\d]/.test(tableName) || /^wasshoi/i.test(tableName) || /^nrs/i.test(tableName)) {
			checkDataTable = await this.getTableData(tableName);
		}

		if (checkDataTable) {
			let diceStr = checkDataTable.dice[diceKind.toLowerCase()];
			//可変数（+x）が表のダイス表記に存在する場合
			if (/\+x/.test(diceStr)) {
				//入力値に可変数が存在する場合（不正値の検出も行う）
				if (additionValue && !Number.isNaN(Number(additionValue))){
					if (Number(additionValue) >= 0) diceStr = diceStr.replace('+x','+' + Math.floor(Number(additionValue)));
					else diceStr = diceStr.replace('+x', Math.floor(Number(additionValue)));
				}
				//入力値に可変数が存在しない、または数字ではない値を与えられた場合は無視する。
				else {
					diceStr = diceStr.replace('+x','');
				}
				//参照したデータテーブルに可変数が用いられたことを知らせる。
				this.isTableAdditionValue = true;
			}
			returnString = diceStr + '#' + tempString;
			//ここでデータテーブルを記録し、後の処理で使用する。
			this.tableData = checkDataTable;
		}
		else {
			returnString = string;
		}
		return returnString;

	}


}

module.exports = SearchTableDiceRoll;