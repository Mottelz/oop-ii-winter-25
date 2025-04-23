const crypto = require("crypto");
const secret = crypto.randomBytes(64).toString("hex");
console.log(`STORE THIS SAFELY AND DO NOT SAHRE IT\n${secret}`);
