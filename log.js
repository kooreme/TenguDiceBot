/**
 * log.js
 * ログ制御
 */

const LOG = process.env.DEBUG || 1;
exports.prints = function(string) {
//	console.log('LOG = ' + LOG);
	if(LOG != 0) {
		console.log(string);
	}
}