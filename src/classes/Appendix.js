const Log = require('../util/log');

class Appendix {
	constructor(string){
		const searchComment = string.search(/\//);
		if (searchComment > 0) {
			this.comment = string.substring(searchComment + 1);
			string = string.substring(0, searchComment);
		}
		else {
			this.comment = '追加カウント';
		}
		let strArray = string.split(/([<>!]=?|=|\*)/);
	
		Log.prints('appendix strArray : 「' + strArray + '」');
	
		this.option = (strArray[1] === '=') ? '==' : strArray[1];
		this.border = Number(strArray[2]);
		this.bairitsu = (strArray[4] != null && !isNaN(strArray[4])) ? Number(strArray[4]) : 1;
	
		if (checkAppendix(this) === false) {
			throw new Error('Appendix : Invalid Appendix');
		}
		this.string = string;	
	}
}

function checkAppendix(app) {

	if (app.option == null || app.border == null || isNaN(app.border)) {
		Log.prints('checkAppendix app null!');
		return false;
	}
	if (/[<>!]=?|=/.test(app.option) === false) {
		Log.prints('checkAppendix app.option unmatch!');
		return false;
	}
	Log.prints('checkAppendix app.option MATCH!');
	return true;

}

module.exports = Appendix;