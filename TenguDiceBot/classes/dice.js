/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const util = require('../util/util');
const Log = require('../util/log');

const Appendix = require('./Appendix');

const DICE_ROLL = /^\d+[dD]\d+(?:(?:[<>!]{1}=?|=){1}\d+)?$/;
const NUMBER_ONLY = /^\d+?$/;
const CHECK_APPENDIX_SINTAX = /(?:<=|<|=|>|>=|!=)\d+\[.+\]$/;

/**
 * @member rawString <string> : 入力直後の文字列
 * @member result <> : ダイスの結果
 * @member 
 */
class Dice {
	constructor(string) {
		this.rawString = string;
		Log.prints('new Dice string : 「' + string + '」');

		if (util.EVERY_APPENDIX.test(string)) {
			Log.prints('Appendix exists.');
			if (!CHECK_APPENDIX_SINTAX.test(string)) {
				throw new Error('Dice : Appendix sintax error!');
			}
			else {
				let strArray = string.split(util.EVERY_APPENDIX);
				string = strArray[0];
				Log.prints('Dice.strArray : 「' + strArray + '」');
				this.appendixArray = createAppendix(strArray[1]);
			}
		}
		else {
			Log.prints('Appendix NOT exists.');
		}

		//マイナスがあるかどうかを受け取り、文字を削除する。
		if (string.slice(0, 1) === '-') {
			this.isMinus = true;
			string = string.substring(1, string.length);
		}

		//最初の文字がdから始まった場合は1dmへ変更する。
		if (/[dD]/.test(string.slice(0, 1)) === true) {
			string = '1' + string;
		}
		//dの後ろに数字がついていない場合は６面ダイスとする。
		if (/^\d+[dD]\d/.test(string) === false) {
			string = string.replace(/([dD])/, '$1' + '6');
		}

		this.trancedString = string;
		if (this.appendixArray != null) {
			this.appendixArray.forEach(function (element) {
				this.trancedString += '[' + element.string + ']';
				Log.prints('******' + this.trancedString);
			}, this);
		}

		//数字だけだった場合はresArrayにその数字をプッシュして終わり。
		if (NUMBER_ONLY.test(string)) {
			Log.prints('数字のみ');
			this.resArray = [string];
			this.sum = util.sum(this.resArray);
			return;
		}

		//文字列がndm(>=k)でない場合はエラーコードを返却。
		if (!DICE_ROLL.test(string)) {
			throw new Error('Dice : not nDm ( >= k )');
		}
		this.splits = string.split(/([dD]|>=|<=|!=|=|<|>)/);
		Log.prints('splits = 「' + this.splits + '」');

		this.diceNum = this.splits[0];
		this.diceMen = this.splits[2];
		this.option = (this.splits[3] != null) ? this.splits[3] : undefined;
		this.border = (this.splits[4] != null) ? this.splits[4] : undefined;

		//ダイス数・ダイス面が規定範囲かどうか
		if (!util.checkSintax(this.diceNum, this.diceMen)) {
			throw new Error('Dice : Invalid Dice');
		}
		//オプションが有る場合には境界の数が数値かどうか
		if (this.option) {
			if(isNaN(this.border)) {
				throw new Error('Dice : Invalid Border');
			}
		}
		this.result = '';		//表示用文字列
		this.resArray = [];		//ダイスの結果配列
	}

	toString() {
		return this.result;
	}

	diceRoll() {
		//数字だけだった場合は結果文字列の作成だけして終了
		if (this.resArray.length !== 0) {
			this.result = '(' + this.sum + ')';
			return;
		}
		for (let i = 0; i < this.diceNum; i++) {
			this.resArray.push(util.getRandomIntInclusive(1, this.diceMen));
		}
		if (!this.option) {
			this.result = '(' + this.resArray.join('+') + ')';
			this.sum = util.sum(this.resArray);
		}
		else {
			switch (this.option) {
				//不等号オプションが入っていたら、成功数などをカウントする。
				case '=':
					this.option = '==';
				// eslint-disable-next-line no-fallthrough
				case '>=':
				case '>':
				case '<':
				case '<=':
				case '!=':
					this._compareBorder();
					break;

				default:
					break;
			}
		}
		//結果と文字列用を分離して管理。
		Log.prints('sum : ' + this.sum);
	}

	_compareBorder() {
		Log.prints('case:' + this.option);
		this.sum = 0;
		let normalSum = 0;
		let resStrArray = [];
		Log.prints('compareBorder() dice.resArray : ' + this.resArray);
		for (let i = 0; i < this.resArray.length; i++) {
			// eslint-disable-next-line no-eval
			if (eval(parseInt(this.resArray[i]) + this.option + this.border)) {
				resStrArray[i] = this.resArray[i];
				normalSum++;
			}
			else {
				resStrArray[i] = '~~' + this.resArray[i] + '~~';
			}
		}
		this.sum += normalSum;
	
		let appResult = ''
		if (this.appendixArray != null) {
			let app = this.appendixArray;
			Log.prints('compareBorder appendix!');
	
			for (let k = 0; k < app.length; k++) {
				let appSum = 0;
				for (let t = 0; t < this.resArray.length; t++) {
					// eslint-disable-next-line no-eval
					if (eval(parseInt(this.resArray[t]) + app[k].option + app[k].border)) {
						appSum += app[k].bairitsu;
						if (!/\*\*/.test(resStrArray[t])) {
							resStrArray[t] = '**' + resStrArray[t] + '**';
						}
					}
				}
				appResult += ' , ' + app[k].comment + '[' + app[k].option + app[k].border + ']：' + appSum;
				Log.prints('compareBorder Appendix sum =' + appSum);
				this.sum += appSum;
				Log.prints('compareBorder Appendix dice.sum =' + this.sum);
			}
	
		}
		Log.prints('compareBorder dice.sum =' + this.sum);
	
		this.result = '(' + resStrArray.join(',') + ' ：成功数：' + normalSum + appResult + ')';
		this.result = this.result.replace(/==/g, '=');
	}
}

function createAppendix(string) {
	//文字列[s][j][s5] -> s,j,s5へ変換。 [s,j,s5] -> s,j,s5になる。どちらも等価として扱えるようになる。
	string = string.substring(1, string.length - 1).replace(/\]\[/g, ',');

	//分割し、Appendixインスタンスを作成する。
	var temp = string.split(',');
	Log.prints('createAppendix temp : 「' + temp + '」');

	var appendixArray = [];
	temp.forEach((element) => {
		appendixArray.push(new Appendix(element));
	});
	Log.prints('createAppendix appendixArray : 「' + appendixArray + '」');

	return appendixArray;

}


module.exports = Dice;
