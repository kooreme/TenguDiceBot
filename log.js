/**
 * log.js
 * ログ制御
 */

const LOG = true;
exports.prints = function(string) {
	if(LOG) {
		console.log(string);
	}
}