const util = require('./util.js');
const Log = require('./log.js');

const DICE_ROLL = /^\d*[dD]\d+/;
const NUMBER_ONLY = /^\d+?$/;

var Dice = function(string){
  Log.prints('new Dice string : ' + string);
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
    Log.prints('splits = ' + this.splits);

    this.diceNum = this.splits[0];
    this.diceMen = this.splits[2];
    this.option = (this.splits[3] != null) ? this.splits[3] : '';
    this.border = (this.splits[4] != null) ? this.splits[4] : '';

    this.result = checkSintax(this.diceNum,this.diceMen);

    if (this.result == util.ERROR_FLAG) {
    	return;
    }

  this.resArray = diceRoll(this.diceNum,this.diceMen);
  this.sum = util.sum(this.resArray);
  Log.prints('sum : ' + this.sum);

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

function diceRoll(diceNum, diceMen) {
    var result = [];
    for(i = 0;i < diceNum;i++) {
        result.push(util.getRandomIntInclusive(1,diceMen));
    }
    return result;
};

function compareBorder(dice) {
	Log.prints('case:' + dice.option);
	dice.sum = 0;
	for (var i=0,l=dice.resArray.length;i<l;i++) {
		if(eval(parseInt(dice.resArray[i]) + dice.option + dice.border)) {
			dice.sum ++;
		}
		else {
			dice.resArray[i] = '~~' + dice.resArray[i] + '~~' ;
		}
	}
	dice.result = '('+ dice.resArray.join(',') +' ：成功数：'+ dice.sum + ')';
}

function checkSintax (diceNum,diceMen) {
	if(isNaN(diceNum) || isNaN(diceMen)) {
		return util.ERROR_FLAG;
	}

	var keta = String(diceMen).length;

	if (0 >= diceNum || 0>= diceMen || diceNum > 900 || diceMen > 100000 || diceNum *(keta+1) > 1900) {
		return util.ERROR_FLAG;
	}

	return '';

}

module.exports = Dice;
