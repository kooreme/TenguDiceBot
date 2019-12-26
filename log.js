/**
 * log.js
 * ログ制御
 */

// eslint-disable-next-line no-undef
const LOG = process.env.DEBUG || 1;
exports.prints = function(string) {
//	console.log('LOG = ' + LOG);
	if(LOG != 0) {
		console.log(string);
	}
}
exports.printsDir = function(string) {
	//	console.log('LOG = ' + LOG);
		if(LOG != 0) {
			console.dir(string);
		}
	}
	