
const path = require('path');
const moment = require('moment');
const {Pool} = require('pg')
const { off } = require('process');
const { start } = require('repl');
require('dotenv').config()
require('fs');
const dbase_rest= new Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DIPASENA
})
dbase_rest.connect();
module.exports = {

    // HTTP HANDLING

    // Respond request to give latest 100 data
    async getDataDipasena(req, res) {
        data = await dbase_rest.query(`SELECT time,suhu_air,suhu_ruang,salinitas,kadar_oksigen
        FROM tambak_dipasena ORDER BY time DESC LIMIT 100`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows.reverse(),
        })
        console.log("[REST-API DIPASENA] GET DATA 100");

    }
}
