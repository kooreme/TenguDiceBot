/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
//dice.js
const COMMENT = /#/;
const MINUS = /-/g;
const SHORT_CUT_COMMAND = /^[kenhu]\d+(?:,\d+)*/i;
const WASSHOI = /^wasshoi\d+$/i;
const HELP = /^help$/;

const Help = require('./help.js');
const datatable = require('./nd_datatable');
const wasshoi = require('./wasshoi.js');
const DiceRoll = require('./diceroll');
const Log = require('./log');
const util = require('./util');
const error = require('./errormessage');

const STRING_WASSHOI = 'wasshoi';

class NDDiceRoll extends DiceRoll.DiceRoll {
	constructor(string, message) {
		super(string, datatable, message);
	}

	/**
	receiveDiceRoll
	引数：String string ※メッセージ反応部はあらかじめ取り除くこと。
	戻り値：String
	ダイスロールメッセージを受信する。
	*/
	async receiveDiceRoll() {
		if (HELP.test(this.string)) {
			return Help.help;
		}
		if (WASSHOI.test(this.string)) {
			return wasshoi.wasshoiDiceRoll(this.string.substring(STRING_WASSHOI.length));
		}
		//通常ダイスロール
		return await this.NormalDiceRoll();
	}

	async NormalDiceRoll() {
		let returnString = '';
		//コマンド表が無いか確認する。
		this.string = await this.checkTable(this.string, this.message);
		//ショートカットコマンドを翻訳する
		let diceinfo = {};
		Log.prints(this.string);
		this.string = this.shortcutTransration(this.string);
		//スーパークラスのダイスロールで実際にダイスを振る。
		diceinfo = super.diceroll(this.string);
		if (diceinfo == null) {
			return error.replyErrorMessage();
		}

		if (diceinfo.dice.length === 0) {
			Log.prints('no dice error');
			return diceinfo.comment;
		}

		Log.printsDir('diceinfo : ' + diceinfo);
		returnString = this.createOutput(diceinfo.dice, diceinfo.comment);
		Log.prints('returnString : ' + returnString);

		returnString += this.addTableOutput(diceinfo);
		Log.prints('returnString : ' + returnString);

		return returnString;

	}

	addTableOutput(diceinfo) {
		let returnString = '';
		//前処理でテーブルを取得できていたら、ここで使用する。なければundefinedで進む。
		let checkDataTable = this.tableData;
		let addString = '';
		let tableString = '';

		if (checkDataTable) {
			if (checkDataTable.d66Option) {
				Log.prints('addTableOutput diceinfo.dice[0].resArray[0]&resArray[1] :' + diceinfo.dice[0].resArray[0] + ',' + diceinfo.dice[0].resArray[1]);
				const array = util.sort(diceinfo.dice[0].resArray);
				const d66 = Number(String(array[0]) + String(array[1]));
				Log.prints('addTableOutput d66 :' + d66);
				tableString = checkDataTable.data[d66];
			}
			else {
				let sum = 0;
				diceinfo.dice.forEach(element => {
					sum += Number(element.sum);
				});
				if (this.isTableAdditionValue) {
					//可変値を使うテーブルで可変値のダイスロールを行い、結果がデータのレンジ外だった場合は、レンジ内の最も近い値を結果として使用する。
					if (checkDataTable.datarange.max < sum) tableString = checkDataTable.data[checkDataTable.datarange.max];
					else if (checkDataTable.datarange.min > sum) tableString = checkDataTable.data[checkDataTable.datarange.min];
					else tableString = checkDataTable.data[sum];
				}
				else tableString = checkDataTable.data[sum];
			}
		}
		Log.prints('addTableOutput tableString :' + tableString);
		if (tableString) addString += '\n\n' + tableString;
		Log.prints('addTableOutput addString :' + addString);

		return returnString + addString;
	}
	/**
 	* shortcutTransration
 	* ショートカット記法を翻訳し、文字列を返す。
 	* */
	shortcutTransration(string) {
		var returnString = '';
		var returnStringArray = [];

		var searchComment = string.search(COMMENT);
		if (searchComment > 0) {
			var comment = string.substring(searchComment);
			string = string.substring(0, searchComment);
		}

		string = string.replace(MINUS, '+-');
		var stringArray = string.split('+');
		Log.prints('shortcutTransration stringArray : ' + stringArray);

		for (var index = 0, strlen = stringArray.length; index < strlen; index++) {
			Log.prints('shortcutTransration : stringArray[' + index + '] : ' + stringArray[index]);
			var appendixSearch = stringArray[index].search(util.EVERY_APPENDIX);
			if (appendixSearch >= 0) {
				var appendix = stringArray[index].substring(appendixSearch);
				stringArray[index] = stringArray[index].substring(0, appendixSearch);
				Log.prints('shortcutTransration : appendix :' + appendix + ' , stringArray[' + index + '] : ' + stringArray[index]);
			}
			var splits = stringArray[index].split(/([+-])/);
			Log.prints('shortcutTransration : splits :' + splits);

			var shortcutArray = [];
			for (var i = 0, l = splits.length; i < l; i++) {
				var optionString = '';
				if (SHORT_CUT_COMMAND.test(splits[i])) {
					var shortcut = splits[i].split(/([kenhu,])/i);

					for (var k = 0, m = shortcut.length; k < m; k++) {
						Log.prints('shortcutTransration shortcut[' + k + '] : ' + shortcut[k]);

						if (k === 1 && /[kenhu]/i.test(shortcut[k])) {
							switch (shortcut[k]) {
								case 'k':
								case 'K':
									optionString = '>=2';
									break;
								case 'e':
								case 'E':
									optionString = '>=3';
									break;
								case 'n':
								case 'N':
									optionString = '>=4';
									break;
								case 'h':
								case 'H':
									optionString = '>=5';
									break;
								case 'u':
								case 'U':
									optionString = '=6';
									break;
								default:
									returnString = util.ERROR_FLAG;
									continue;
							}
						}

						else if (/\d+/.test(shortcut[k])) {
							let temp = shortcut[k] + 'd6' + optionString;
							temp += (appendix != null) ? appendix : '';
							shortcutArray.push(temp);
						}
						else if (shortcut[k] !== ',' && shortcut[k] !== '') {
							return util.ERROR_FLAG;
						}
					}
				}
				else if (splits[i] === '+') {
					continue;
				}
				else {
					let temp = splits[i];
					temp += (appendix != null) ? appendix : '';
					shortcutArray.push(temp);
				}
			}
			returnStringArray.push(shortcutArray.join('+'));
		}
		returnString = returnStringArray.join('+');
		returnString += (comment != null) ? comment : '';
		Log.prints('shortcutTransration returnString : ' + returnString);

		returnString = returnString.replace(/\+-\+/g, '-');
		returnString = returnString.replace(/\+-/g, '-');
		returnString = returnString.replace(/\+#\+/g, '#');

		Log.prints('shortcutTransration returnString : ' + returnString);
		return returnString;
	}

	async checkTable(string) {
		let returnString = '';
		let diceKind = '';
		let tempString = string;
		let additionValue;
		Log.prints("before spellCheck : " + tempString);
		tempString = this.spellCheck(tempString);
		Log.prints("after spellCheck : " + tempString);
		if (/,/.test(tempString)) {
			let temp = tempString.split(',');
			diceKind = temp[1] ? temp[1] : 'a';
			tempString = temp[0];
			additionValue = temp[2];
		}
		let checkDataTable;
		//テーブル名は半角英数禁止のため、最初の文字が半角英数ならテーブル検索は不要。
		//検索スキップにより、パフォーマンスを向上させる。
		if (!/^[a-zA-Z\d]/.test(tempString)) {
			checkDataTable = await this._getTableData(tempString);
		}
		Log.prints('checkDataTable =' + checkDataTable);

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

module.exports.NDDiceRoll = NDDiceRoll;

