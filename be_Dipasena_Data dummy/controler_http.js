
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
        data = await dbase_rest.query(`SELECT to_char(time, 'DD-MM-YYYY HH24:MI:SS') as time,humidity,pressure,temperature,ph,tds,amonia,kadar_oksigen,temp_air 
        FROM dipasena ORDER BY time DESC LIMIT 100`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA 100");

    },

    // respond request to give latest 50 data 
    async getDataTable(req, res) {
        data = await dbase_rest.query(`SELECT to_char(time, 'DD-MM-YYYY HH24:MI:SS') as time,humidity,pressure,temperature,ph,tds,amonia,kadar_oksigen,temp_air 
        FROM dipasena ORDER BY time DESC LIMIT 50`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA FOR TABLE 50");

    },
    async getDataChart(req, res) {
        data = await dbase_rest.query(`SELECT to_char(time, 'DD-MM-YYYY HH24:MI:SS') as time,humidity,pressure  
        FROM dipasena ORDER BY time DESC LIMIT 50`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA FOR CHART 50");

    },

}
