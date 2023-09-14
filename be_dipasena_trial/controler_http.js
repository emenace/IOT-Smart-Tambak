
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
        data = await dbase_rest.query(`SELECT to_char(time, 'DD-MM-YYYY HH24:MI:SS') as time, suhu_air_permukaan, suhu_air_dasar, suhu_ruang, salinitas, oxygen, salinitas, ph, amonia FROM tambak_dipasena ORDER BY time DESC LIMIT 50`);
        
        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA 50");
        
    },

    //  MENDAPATKAN 50 DATA UNTUK TABEL 
    async getDataTabel(req, res) {
        data1 = await dbase_rest.query(`SELECT to_char(time, 'DD-MM-YYYY HH24:MI:SS') as time, suhu_air_permukaan, suhu_air_dasar, suhu_ruang, salinitas, oxygen, ph, amonia FROM tambak_dipasena ORDER BY time DESC LIMIT 10`);

        res.status(200);
        res.send({
            count:data1.rowCount,
            result:data1.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA TABEL 50");
    },
    async getDataTabel(req, res) {
        data1 = await dbase_rest.query(`SELECT to_char(time, 'DD-MM-YYYY HH24:MI:SS') as time, suhu_air_permukaan, suhu_air_dasar, suhu_ruang, salinitas, oxygen, ph, amonia FROM tambak_dipasena ORDER BY time DESC LIMIT 10`);

        res.status(200);
        res.send({
            count:data1.rowCount,
            result:data1.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA TABEL 50");
    },
    async getDataTabel(req, res) {
        data1 = await dbase_rest.query(`SELECT to_char(time, 'DD-MM-YYYY HH24:MI:SS') as time, suhu_air_permukaan, suhu_air_dasar, suhu_ruang, salinitas, oxygen, ph, amonia FROM tambak_dipasena ORDER BY time DESC LIMIT 10`);

        res.status(200);
        res.send({
            count:data1.rowCount,
            result:data1.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA TABEL 50");
    },
    // CHART 
    async getDataChart(req, res) {
        data1 = await dbase_rest.query(`SELECT to_char(time, 'DD-MM-YYYY HH24:MI:SS') as time, suhu_air_permukaan FROM tambak_dipasena ORDER BY time DESC LIMIT 50`);

        res.status(200);
        res.send({
            count:data1.rowCount,
            result:data1.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA CHART 20");
    },

    

}
