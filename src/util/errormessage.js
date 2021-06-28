const util = require('./util.js');

const errorMessage = [
	'入力エラーです。正しい構文を入力してください。'
];

exports.replyErrorMessage = function(addStr = ''){
	return errorMessage[util.getRandomIntInclusive(0,errorMessage.length - 1)] + (addStr !== '' ? ('\n' + addStr) : '');
}


