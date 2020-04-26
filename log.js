/**
 * log.js
 * ログ制御
 */

const LOG = global.process.env.DEBUG || 1;
//boolにtrueを入れないと表示されない。表示したいものだけtrueにすること。
exports.prints = function(string,bool = true) {
//	console.log('LOG = ' + LOG);
	if(LOG !== 0 && bool) {
		console.log(string);
	}
}
//boolにtrueを入れないと表示されない。表示したいものだけtrueにすること。
exports.printsDir = function(string,bool = true) {
	//	console.log('LOG = ' + LOG);
		if(LOG !== 0 && bool) {
			console.dir(string);
		}
	}
	