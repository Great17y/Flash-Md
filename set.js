const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0xDdnBKV1AwTEFLRGR1WHdRNUE4eUZQczhGNUxGUURTc3dnMkwxQUpVZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiakFrM0FtR1FlUmkxTUZjMnZnL2tBS295UVVNaXNtdGVUbXYvMkZYRmVHaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2REpPUmlmMHBlSTlzTVIxVU9BVDRBSDFISnZMUmJreHp0aGl1cVVDcW1JPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvNmZLSGZCeGdTY1pBSXdTY2dDKzFLa1kySW92d1NSRGg2QzhiZElzTUFzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJIL0lETXpHbzhIRmtialdiYW1MRU5hZGdpdXlUN1FOVkpiODlERDBRMzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVYRUt3NEtKbWpmTTU3MG96aE1KankyRDN2c0RCSDlNNzJmeXNsTU5UM2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUlNVWtHTkNFcjcyZXRQb3hVeTFlZ1UxeFE4UkRhZURvWmE3M01iUGszMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNS93bm1qMllmbTQybDN6OFU5WXcwamhTbW9KeXg4OGVrbGlrYUx3U2hRRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJxQlJ1K3VDaEtTeU1LbGE2bGhMZVNyYXg1UG1tWEM4bkNkQ2tvRUtvNm11K3AzdEdaZjFQVFFkY2R0VGZSV2t2WXpqMTA3eWgwQXI2d1U2T3YwckJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzYsImFkdlNlY3JldEtleSI6IlBKTFlPYlFTTVZWMVpDVDEydHk1R3NQczZjbWV6SGhWay9TNExKRTNDRDg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODA3MDU0OTQ0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1QTRDNThDODI5QTEzRTY2QjdEMEE1RTgxOEI1QTk2QSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxNTg5MDU2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJaU2Vmd0lMQlJJV0dTdUh1TkZORktRIiwicGhvbmVJZCI6IjZkYzNjYmE5LTYwYzEtNDViZi04ZTZkLTk2YTg1MTU3Y2M4OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0dFZwcUNvYWIzd2dWbFdZejdaamR5SXpLQjQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFV3aVdhUlhBMWdrbkFCcHVUdVhEWUdrZzBvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRUQk5BSjJIIiwibWUiOnsiaWQiOiIyMzQ4MDcwNTQ5NDQzOjc3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNYWc4S1FFRUs2NjliUUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI4TVlLK0JRNkQ0VGFXTENyV0pOaTZUd3gzT0hKNkE1cWpIV1VlME8zR21rPSIsImFjY291bnRTaWduYXR1cmUiOiJVbnlPaFVYRHd0Vlo3SWJ0UWVlNHhybmtBUXVzYmZOYjNLYkhNMW90TVZPQkJ5bkxtOGpQU3A5R2ZUMEErWlRzRmlhNVluOHF1ZVEyZFAybkl6RTlBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiT3N3bjg1RnZjWGdxUU9TcThzWmMvSVhKc3poUE1tUVhtZVRXTmNScVpaRkQwT1FYMk9XUFVOQ0t1VDFIdHZoaVpsbzJMbEtXckd2bHEvQU5kZTJ2Qnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDcwNTQ5NDQzOjc3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZER0N2Z1VPZytFMmxpd3ExaVRZdWs4TWR6aHllZ09hb3gxbEh0RHR4cHAifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE1ODkwNTEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTFlRIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348070549443", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'available',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
