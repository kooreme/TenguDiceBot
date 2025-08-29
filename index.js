require("dotenv").config();
const TENGU_MENTENANCE = Number(process.env.TENGU_MENTENANCE) === 1 ?? false;
if (!TENGU_MENTENANCE) require("./TenguDiceBot/index");
