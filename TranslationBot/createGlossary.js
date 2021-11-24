/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const fs = require("fs")
const keyDir = process.cwd();
const keyJson = keyDir + "/key.json";
//console.log(process.env.TRANSLATION_KEY_1);
//console.log(process.env.TRANSLATION_KEY_2);
const key = process.env.TRANSLATION_KEY_1 + process.env.TRANSLATION_KEY_2;
const projectId = process.env.TRANSLATION_PROJECT_ID;
const location = process.env.TRANSLATION_LOCATION;

const glossaryId = process.env.TRANSLATION_GLOSSARY_ID_NJ;
const glossaryPrefix = process.env.TRANSLATION_GLOSSARY_ID_NJ_PREFIX;

const parent = `projects/${projectId}/locations/${location}`;

try {
  if (!fs.existsSync(keyJson)) {
    fs.writeFileSync(keyJson, key);
    console.log('write end');
  }
} catch (e) {
  console.log(e);
}
// Imports the Google Cloud Translation library
const { TranslationServiceClient } = require('@google-cloud/translate');

// Instantiates a client
const translationClient = new TranslationServiceClient({ keyFilename: keyJson });

const languages = ['ja', 'ko', 'en'];

async function createGlossary(from, to) {
  // Construct glossary
  const gIdName = `${glossaryPrefix}-from-${from}-to-${to}`;
  const glossary = {
    languagePair : {
      sourceLanguageCode : from,
      targetLanguageCode : to,
    },
    inputConfig: {
      gcsSource: {
        inputUri: `gs://glossary_translation_bot/${gIdName}.csv`,
      },
    },
    name: `${parent}/glossaries/${gIdName}`,
  };

  // Construct request
  const request = {
    parent: parent,
    glossary: glossary,
  };

  // Create glossary using a long-running operation
  const [operation] = await translationClient.createGlossary(request);

  // Wait for the operation to complete
  return operation.promise().then(() => {
    console.log('Created glossary:');
    //console.log(`InputUri ${request.glossary.inputConfig.gcsSource.inputUri}`);  
  }).catch(e => console.log(e));

}

async function deleteGlossary(from, to) {
  // Construct request
  const gIdName = `${glossaryPrefix}-from-${from}-to-${to}`;
  const request = {
    parent: parent,
    name: `${parent}/glossaries/${gIdName}`,
  };

  // Delete glossary using a long-running operation
  const [operation] = await translationClient.deleteGlossary(request);

  // Wait for operation to complete.
  return operation.promise().then(() => {
    console.log(`Deleted glossary.`);
  }).catch(e => console.log(e));
}

async function listGlossaries() {
  // Construct request
  const request = {
    parent: `${parent}`,
  };

  // Run request
  const [response] = await translationClient.listGlossaries(request);

  for (const glossary of response) {
    console.log(glossary);
  }
}
async function createMultiLangGlossary() {
  // Construct glossary
  const glossary = {
    languageCodesSet: {
      languageCodes: ['ja', 'ko', 'en'],
    },
    inputConfig: {
      gcsSource: {
        inputUri: 'gs://glossary_translation_bot/glossary_NinjaSlayer.csv',
      },
    },
    name: `${parent}/glossaries/${glossaryId}`,
  };

  // Construct request
  const request = {
    parent: `${parent}`,
    glossary: glossary,
  };

  // Create glossary using a long-running operation
  const [operation] = await translationClient.createGlossary(request);

  // Wait for the operation to complete
  await operation.promise();

  console.log('Created glossary:');
  console.log(`InputUri ${request.glossary.inputConfig.gcsSource.inputUri}`);
}
async function deleteMultiLangGlossary() {
  // Construct request
  const request = {
    parent: `${parent}`,
    name: `${parent}/glossaries/${glossaryId}`,
  };

  // Delete glossary using a long-running operation
  const [operation] = await translationClient.deleteGlossary(request);

  // Wait for operation to complete.
  const [response] = await operation.promise();

  console.log(`Deleted glossary: ${response.name}`);
}
async function updateMultiLangGlossary() {
  await deleteMultiLangGlossary();
  await createMultiLangGlossary();
}

async function createAllGlossaries() {
  const promises = operateAllGlossaries(createGlossary);
  await Promise.allSettled(promises);
}

async function deleteAllGlossaries() {
  const promises = operateAllGlossaries(deleteGlossary);
  await Promise.allSettled(promises);
}

async function updateAllGlossaries() {
  await deleteAllGlossaries();
  await createAllGlossaries();
}

function operateAllGlossaries(callFunc) {
  const glossaryPromise = [];
  for (let i = 0; i < languages.length; i++) {
    let from = languages[i];
    for (let j = 0; j < languages.length; j++) {
      if (i === j) continue;
      let to = languages[j];
      let promise = callFunc(from, to);
      glossaryPromise.push(promise);
    }
  }
  return glossaryPromise;
}
//用語集リストの確認
//listGlossaries();

//多言語セットの用語集操作
//createMultiLangGlossary();
//deleteMultiLangGlossary();
updateMultiLangGlossary();

//単一方向用語集の操作
//createAllGlossaries();
//deleteAllGlossaries();
//updateAllGlossaries();