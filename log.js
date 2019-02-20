/**
 * log.js
 * ログ制御
 */

const LOG = process.env.DEBUG || true;
exports.prints = function(string) {
	console.log('LOG = ' + LOG);
	if(LOG) {
		console.log(string);
	}
}