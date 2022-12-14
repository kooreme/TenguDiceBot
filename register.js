const IS_TENGU_REGISTER = Number(process.env.IS_TENGU_REGISTER) === 1 ?? false;
if (!IS_TENGU_REGISTER) require("./TenguDiceBot/register");
