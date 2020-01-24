/**
 * log.js
 * ログ制御
 */

// eslint-disable-next-line no-undef
const LOG = process.env.DEBUG || 1;
//boolにtrueを入れないと表示されない。表示したいものだけtrueにすること。
exports.prints = function(string,bool = false) {
//	console.log('LOG = ' + LOG);
	if(LOG != 0 && bool) {
		console.log(string);
	}
}
//boolにtrueを入れないと表示されない。表示したいものだけtrueにすること。
exports.printsDir = function(string,bool = false) {
	//	console.log('LOG = ' + LOG);
		if(LOG != 0 && bool) {
			console.dir(string);
		}
	}
	