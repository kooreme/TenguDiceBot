/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const datatable = require('./nd_datatable');
const SearchTableDiceRoll = require('../classes/SearchTableDiceroll');
const Log = require('../util/log');
const error = require('./nd_errormessage');
const ShortcutTranslator = require('./NJShortcutTranslator');

class NDDiceRoll extends SearchTableDiceRoll {
	constructor(string, channelID) {
		super(string, datatable, channelID);
	}

	async receiveDiceRoll() {
		try {
			return await this._NormalDiceRoll();
		} catch (e) {
			e.discordMessage = error.replyErrorMessage();
			console.error(e.message);
			throw e;
		}
	}

	async _NormalDiceRoll() {
		//コマンド表が無いか確認する。
		this.string = await this.checkTable(this.string);
		//ショートカットコマンドを翻訳する
		let diceinfo = {};
		Log.prints(this.string);
		this.string = ShortcutTranslator(this.string);
		//スーパークラスのダイスロールで実際にダイスを振る。
		diceinfo = this.diceroll(this.string);
		if (diceinfo == null) {
			throw new Error('NormalDiceRoll : diceinfo is null');
		}

		if (diceinfo.dice.length === 0) {
			throw new Error('NormalDiceRoll : diceinfo.dice.length === 0');
		}

		return this;

	}
}

module.exports = NDDiceRoll;

