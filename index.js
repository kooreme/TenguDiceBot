const TENGU_MENTENANCE = Number(process.env.TENGU_MENTENANCE) === 1 ?? false;
//const TRANS_MENTENANCE = Number(process.env.TRANS_MENTENANCE) === 1 ?? false;
if (!TENGU_MENTENANCE) require("./TenguDiceBot/index");
//if(!TRANS_MENTENANCE) require("./TranslationBot/index");
