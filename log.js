/**
 * log.js
 * ログ制御
 */

const LOG = false;
exports.prints = function(string) {
	if(LOG) {
		console.log(string);
	}
}