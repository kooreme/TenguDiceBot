require("dotenv").config();
const TENGU_MENTENANCE =
    Number(process.env.TENGU_MENTENANCE) === 1 ? true : false;
if (!TENGU_MENTENANCE && process.env.BOT_TOKEN)
    require("./TenguDiceBot/adaptor/discord_adaptor");
if (!TENGU_MENTENANCE && process.env.FLUXER_BOT_TOKEN)
    require("./TenguDiceBot/adaptor/fluxer_adaptor");
