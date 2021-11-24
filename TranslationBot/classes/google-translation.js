const fs = require("fs")
// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2;

const keyDir = process.cwd();
const keyJson = keyDir + "/key.json";
//console.log(process.env.TRANSLATION_KEY_1);
//console.log(process.env.TRANSLATION_KEY_2);
const key = process.env.TRANSLATION_KEY_1 + process.env.TRANSLATION_KEY_2;

try {
  if(!fs.existsSync(keyJson)) {
    fs.writeFileSync(keyJson, key);
    console.log('write end');  
  }
}catch(e){
  console.log(e);
}

const ERROR = {
  APIError : "Google Translation API Failure. Please contact くりーむ.", //APIError時は英語のみ
  overMaxLength : "翻訳に失敗しました。翻訳後に最大文字数を超過しました。"
}

class TransWrapper {
  constructor() {
    this.translate = new Translate({ keyFilename : keyJson});
  }

  async translateText(text,target) {

    let [translations] = await this._translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    if (!(translations.every(el => el?.length < 1900))) {
      //エラーメッセージを翻訳する。
      [translations] = await this._translate(ERROR.overMaxLength, target);
    }
    console.log("translations : ",translations);
    //translations = translations.map(t => t.replaceAll(/(<).*?([@#]{1}).*?(!{0,1}).*?(\d*?>)/g, "$1$2$3$4 "))
    return translations;
  }

  async _translate(text ,target) {
    return await this.translate.translate(text,target).catch(e => {
      console.error(e);
      return ERROR.APIError;
    });
  }

  async isTargetTranslatable(target) {
    const exist = await this.translate.getLanguages()
    .then(languages => languages[0].map(el => el.code).includes(target))
    .catch((e) => {
      console.log(e);
      return false;
    });
    return exist;
  }
}

module.exports = new TransWrapper();