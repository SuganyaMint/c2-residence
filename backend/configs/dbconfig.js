const mysql2 = require("mysql2/promise");

const configdb = {
  host: "103.13.30.245",
  user: "ragmapi",
  password: "v0!WZT.2Fwrk2Ntx",
  database: "c4_db",
};

const pool = mysql2.createPool(configdb);

module.exports = pool;
