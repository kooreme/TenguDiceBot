const fs = require("fs")
// Imports the Google Cloud client library
const { TranslationServiceClient: Translate } = require('@google-cloud/translate');

const keyDir = process.cwd();
const keyJson = keyDir + "/key.json";
//console.log(process.env.TRANSLATION_KEY_1);
//console.log(process.env.TRANSLATION_KEY_2);
const key = process.env.TRANSLATION_KEY_1 + process.env.TRANSLATION_KEY_2;
const projectId = process.env.TRANSLATION_PROJECT_ID;
const location = process.env.TRANSLATION_LOCATION;
const glossaryId = process.env.TRANSLATION_GLOSSARY_ID_NJ;
const glossaryPrefix = process.env.TRANSLATION_GLOSSARY_ID_NJ_PREFIX;

try {
  if (!fs.existsSync(keyJson)) {
    fs.writeFileSync(keyJson, key);
    console.log('write end');
  }
} catch (e) {
  console.log(e);
}

const ERROR = {
  APIError: "Google Translation API Failure. Please contact くりーむ.", //APIError時は英語のみ
  overMaxLength: "翻訳に失敗しました。翻訳後に最大文字数を超過しました。"
}

class TransWrapper {
  constructor() {
    this.translate = new Translate({ keyFilename: keyJson });
  }

  async translateText(text, from, target) {

    let [gTrans,trans] = await this._translate(text, from, target);
    gTrans = gTrans.map(el => el.translatedText);
    trans = trans.map(el => el.translatedText);

    console.log(gTrans,trans);

    //Discordに2000字制限があるため、バッファ10文字を取って弾く
    if (!(gTrans.every(el => el?.length < 1990))) {
      //エラーメッセージを翻訳する。
      [gTrans] = await this._translate(ERROR.overMaxLength, target);
      gTrans = gTrans.translations.map(el => el.translatedText);
    }
    //translations = translations.map(t => t.replaceAll(/(<).*?([@#]{1}).*?(!{0,1}).*?(\d*?>)/g, "$1$2$3$4 "))
    return gTrans;
  }

  async _translate(text, from, target) {
    // Construct request
    const request = {
      parent: this.translate.locationPath(projectId, location),
      contents: Array.isArray(text) ? text : [text],
      mimeType: 'text/plain', // mime types: text/plain, text/html
      sourceLanguageCode: from,
      targetLanguageCode: target,
      glossaryConfig: {
        glossary: `projects/${projectId}/locations/${location}/glossaries/${glossaryId}`,
      },
    };
    const [test] = await this.translate.translateText(request).catch(e => {
      console.error(e);
      return ERROR.APIError;
    });
    return [test.glossaryTranslations, test.translations]; 
  }

  async isTargetTranslatable(target) {
    const request = {
      parent : this.translate.locationPath(projectId,location),
    }
    const exist = await this.translate.getSupportedLanguages(request)
      .then(response => {
        return response[0].languages.map(el => el.languageCode).includes(target)
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
    return exist;
  }
}

module.exports = new TransWrapper();
//テスト用
/*
(async function() {
  const text = ["サツバツ！","フジキド"];
  const from = "ja";
  const target = "ko";
  await new TransWrapper().translateText(text,from,target);
})();
*/
/*
(async function() {
  const data = await new TransWrapper().isTargetTranslatable("ab");
  console.log(data);
})();
*/