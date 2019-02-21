const util = require('./util.js');
const Log = require('./log.js');

const DICE_ROLL = /^\d*[dD]\d+/;
const NUMBER_ONLY = /^\d+?$/;
const CHECK_APPENDIX_SINTAX = /(?:<=|<|=|>|>=|!=)\d+\[.+\]$/;


var Dice = function(string){
  Log.prints('new Dice string : 「' + string + '」');

  if (util.EVERY_APPENDIX.test(string)) {
	  Log.prints('Appendix exists.');
	  if (!CHECK_APPENDIX_SINTAX.test(string)) {
		  Log.prints('Dice : Appendix sintax error!');
		  this.result = util.ERROR_FLAG;
		  return;
	  }
	  else {
		  var strArray = string.split(util.EVERY_APPENDIX);
		  string = strArray[0];
		  Log.prints('Dice.strArray : 「' + strArray + '」');
		  try {
			  this.appendixArray = createAppendix(strArray[1]);
		  } catch(e) {
		      this.result = util.ERROR_FLAG;
		      return;
		  }
	  }
  }
  else {
	  Log.prints('Appendix NOT exists.');
  }

  //マイナスがあるかどうかを受け取り、文字を削除する。
  if(string.slice(0,1) == '-') {
    this.isMinus = true;
    string = string.substring(1, string.length);
  }

  //最初の文字がdから始まった場合は1dmへ変更する。
  if (string.slice(0,1) == 'd') {
    string = '1' + string;
  }
  //数字だけだった場合はresArrayにその数字をプッシュして終わり。
  if (NUMBER_ONLY.test(string)) {
    Log.prints('数字のみ');
    this.resArray = [string];
    this.sum = util.sum(this.resArray);
    return;
  }

  //文字列がndmでない場合はエラーコードを返却。
  if (!DICE_ROLL.test(string)) {
    this.result = util.ERROR_FLAG;
    return;
  };
    this.splits = string.split(/([dD]|>=|<=|!=|=|<|>)/);
    Log.prints('splits = ' + this.splits + '」');

    this.diceNum = this.splits[0];
    this.diceMen = this.splits[2];
    this.option = (this.splits[3] != null) ? this.splits[3] : '';
    this.border = (this.splits[4] != null) ? this.splits[4] : '';


    if (!util.checkSintax(this.diceNum,this.diceMen) || isNaN(this.border)) {
        this.result = util.ERROR_FLAG;
    	return;
    }
  this.result = '';

  this.resArray = [];

};

Dice.prototype.toString = function() {

    switch(this.option) {

    //不等号オプションが入っていたら、成功数などをカウントする。
    case '=' :
    	this.option = '==';
    case '>=' :
    case '>' :
    case '<' :
    case '<=' :
    case '!=' :
    	compareBorder(this);
    	break;

    default :
        this.result = '(' + this.resArray.join('+') + ')';
        break;
    }
    Log.prints('result = ' + this.result);
    return this.result;
}

Dice.prototype.diceRoll = function() {
	//数字だけだった場合はダイスロールしない。
	if (this.resArray.length != 0) {
		return;
	}
    for(i = 0;i < this.diceNum;i++) {
        this.resArray.push(util.getRandomIntInclusive(1,this.diceMen));
    }
    this.sum = util.sum(this.resArray);

    //結果と文字列用を分離して管理。
    this.resStrArray = this.resArray.slice();
    Log.prints('sum : ' + this.sum);

};

function compareBorder(dice) {
	Log.prints('case:' + dice.option);
	dice.sum = 0;
	var normalSum = 0;
	for (var i=0,l=dice.resArray.length;i<l;i++) {
		if(eval(parseInt(dice.resArray[i]) + dice.option + dice.border)) {
			normalSum ++;
		}
		else {
			dice.resStrArray[i] = '~~' + dice.resStrArray[i] + '~~' ;
		}
	}
	dice.sum += normalSum;

	var appResult = ''
	if (dice.appendixArray != null) {
		var app = dice.appendixArray;
		Log.prints('compareBorder appendix!');

		for (var k=0,m=app.length;k<m;k++) {
			var appSum = 0;
			for (var t=0,s=dice.resArray.length;t<s;t++) {
				if(eval(parseInt(dice.resArray[t]) + app[k].option + app[k].border)) {
					appSum = appSum + app[k].bairitsu;
					if (!/\*\*/.test(dice.resStrArray[t])) {
						dice.resStrArray[t] = '**' + dice.resStrArray[t] + '**';
					}
				}
			}
			appResult += ' , ' + app[k].comment + '[' + app[k].option + app[k].border + ']：' + appSum;
			Log.prints('compareBorder Appendix sum =' + appSum);
			dice.sum += appSum;
			Log.prints('compareBorder Appendix dice.sum =' + dice.sum);
		}

	}
	Log.prints('compareBorder dice.sum =' + dice.sum);

	dice.result = '('+ dice.resStrArray.join(',') +' ：成功数：'+ normalSum + appResult + ')';
	dice.result = dice.result.replace(/==/g , '=');
}

var Appendix = function (string){
	const searchComment = string.search(/\//);
    if (searchComment > 0) {
    	this.comment = string.substring(searchComment+1);
    	string = string.substring(0,searchComment);
    }
    else {
    	this.comment = '追加カウント';
    }
    var strArray = string.split(/([<>!]=?|=|\*)/);

	Log.prints('appendix strArray : 「' + strArray + '」');

	this.option = (strArray[1] == '=') ? '==' : strArray[1];
	this.border = Number(strArray[2]);
	this.bairitsu = (strArray[4] != null && !isNaN(strArray[4])) ? Number(strArray[4]) : 1 ;

	if (checkAppendix(this) == false) {
		throw util.ERROR_FLAG;
	}


};

function checkAppendix(app) {

	if (app.option == null || app.border == null || isNaN(app.border)) {
		Log.prints('checkAppendix app null!');
		return false;
	}
	if (/[<>!]=?|=/.test(app.option) == false) {
		Log.prints('checkAppendix app.option unmatch!');
		return false;
	}
	Log.prints('checkAppendix app.option MATCH!');
	return true;

}

function createAppendix(string) {
	string = string.substring(1,string.length-1).replace(/\]\[/g, ',');

	var temp = string.split(',');
	Log.prints('createAppendix temp : 「' + temp + '」');

	var appendixArray = [];
	temp.forEach(function(element){
		element = appTransration(element);
		appendixArray.push(new Appendix(element));
	});
	Log.prints('createAppendix appendixArray : 「' + appendixArray + '」');

	return appendixArray;

}

function appTransration(string) {
	switch(string) {
	case 'j':
		string = '=1/ジツ暴走';
		break;
	case 's5':
		string = '>=5/サツバツ！';
		break;
	case 's':
	case 's6':
		string = '=6/サツバツ！';
		break;
	default :
		break;

	}
	return string;

}
module.exports = Dice;
