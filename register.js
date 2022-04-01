const IS_TENGU_REGISTER = Number(process.env.IS_TENGU_REGISTER) === 1 ?? false;
const IS_TRANS_REGISTER = Number(process.env.IS_TRANS_REGISTER) === 1 ?? false;
if(!IS_TENGU_REGISTER) require("./TenguDiceBot/register");
if(!IS_TRANS_REGISTER) require("./TranslationBot/register");