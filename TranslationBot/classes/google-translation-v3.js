const fs = require("fs");
// Imports the Google Cloud client library
const {
    TranslationServiceClient: Translate,
} = require("@google-cloud/translate");
/** @typedef {import('@google-cloud/translate').protos.google.cloud.translation.v3.ITranslation} ITranslation */
/** @typedef {import('@google-cloud/translate').protos.google.cloud.translation.v3.ITranslateTextRequest} ITranslateTextRequest */

const keyDir = process.cwd();
const keyJson = keyDir + "/key.json";
const key = process.env.TRANSLATION_KEY_1 + process.env.TRANSLATION_KEY_2;
const projectId = process.env.TRANSLATION_PROJECT_ID;
const location = process.env.TRANSLATION_LOCATION;
const glossaryId = process.env.TRANSLATION_GLOSSARY_ID_NJ;

try {
    if (!fs.existsSync(keyJson)) {
        fs.writeFileSync(keyJson, key);
    }
} catch (e) {
    console.error(e);
}

const ERROR = {
    APIError: "Google Translation API Failure. Please contact くりーむ.", //APIError時は英語のみ
    overMaxLength: "翻訳に失敗しました。翻訳後に最大文字数を超過しました。",
};

/**
 * Google翻訳のラッパークラスです．
 */
class TransWrapper {
    constructor() {
        this.translate = new Translate({ keyFilename: keyJson });
    }

    /**
     * 文字列を受け取り，翻訳し，結果またはエラーを返します．
     * @param {string | string[]} text 翻訳すべきテキストです．
     * @param {string} from 翻訳元の言語です．
     * @param {string}} target 翻訳先の言語です．
     * @returns {Promise<string[]>} 翻訳されたテキストです．
     */
    async translateText(text, from, target) {
        // TODO gTransの型がしょっちゅう変わる（実質shadowing）ため，別変数で扱う
        let [gTrans] = await this._translate(text, from, target);
        gTrans = gTrans.map((el) => el.translatedText);

        //Discordに2000字制限があるため、バッファ10文字を取って弾く
        if (!gTrans.every((el) => el?.length < 1990)) {
            //エラーメッセージを翻訳する。
            [gTrans] = await this._translate(ERROR.overMaxLength, target);
            gTrans = gTrans.translations.map((el) => el.translatedText);
        }
        gTrans = gTrans.map((t) =>
            t.replaceAll(/(<).*?([@#!]{1,2}).*?(\d*?>)/g, "$1$2$3 ")
        );
        return gTrans;
    }

    /**
     * 文字列を受け取り，結果を返します．
     * @private
     * @param {string | string[]} text 翻訳すべき文字列です．
     * @param {string} from 翻訳元の言語です．// TODO：フォーマットについての説明を追加する
     * @param {string} target 翻訳先の言語です．// TODO：フォーマットについての説明を追加する
     * @returns {Promise<[ITranslation[], ITranslation[]]>} 翻訳が成功した場合はその結果，失敗した場合はエラーメッセージを含むタプルです．
     */
    async _translate(text, from, target) {
        /**
         * Construct request.
         * @type {ITranslateTextRequest}
         */
        const request = {
            parent: this.translate.locationPath(projectId, location),
            contents: Array.isArray(text) ? text : [text],
            mimeType: "text/plain", // mime types: text/plain, text/html
            sourceLanguageCode: from,
            targetLanguageCode: target,
            glossaryConfig: {
                glossary: `projects/${projectId}/locations/${location}/glossaries/${glossaryId}`,
            },
        };
        // TODO: おそらくここでcatchすべきではないか，またはERROR.APIErrorをもう一度throwすべき
        const [test] = await this.translate
            .translateText(request)
            .catch((e) => {
                console.error(e);
                return { glossaryTranslations: ERROR.APIError };
            });
        // 関数シグニチャにてAssertionを行なっている
        return [test.glossaryTranslations, test.translations];
    }

    /**
     * ある言語が対応しているかを返します．
     * @param {string} target 翻訳先の言語です．
     * @returns 翻訳できる場合true，できない場合falseです．
     */
    async isTargetTranslatable(target) {
        const request = {
            parent: this.translate.locationPath(projectId, location),
        };
        const exist = await this.translate
            .getSupportedLanguages(request)
            .then((response) => {
                return response[0].languages
                    .map((el) => el.languageCode)
                    .includes(target);
            })
            .catch((e) => {
                console.error(e);
                return false;
            });
        return exist;
    }
}

module.exports = new TransWrapper();
// テスト用
// TODO: 適切なテストの書き方を行う
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
