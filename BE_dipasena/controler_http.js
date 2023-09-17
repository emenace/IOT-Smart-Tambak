
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
        data = await dbase_rest.query(`SELECT to_char(time, 'DD-MM-YYYY HH24:MI:SS') as time, suhu_air_permukaan, suhu_air_dasar, suhu_ruang, salinitas, oxygen, salinitas, ph, amonia FROM tambak_dipasena ORDER BY time DESC LIMIT 10`);
        
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
    // CHART 
    async getDataChartSuhuPer(req, res) {
        data2 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time1, suhu_air_permukaan,suhu_air_dasar,suhu_ruang FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data2.rowCount,
            result:data2.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA CHART 50");
    },

    // CHART PH
    async getDataChartPh(req, res) {
        data3 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time2, ph FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data3.rowCount,
            result:data3.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA PH 50");
    },
    // CHART kadar Oksigen
    async getDataChartDo(req, res) {
        data4 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time3, oxygen FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data4.rowCount,
            result:data4.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA DO 60");
    },
    // CHART Salinitas 
    async getDataChartSalinitas(req, res) {
        data5 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time4, salinitas FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data5.rowCount,
            result:data5.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA SALINITAS 60");
    },
    // CHART Suhu Ruanng
    async getDataChartSuhuRuang(req, res) {
        data6 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time5, suhu_ruang FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data6.rowCount,
            result:data6.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA SUHU RUANG 60");
    },
    // CHART Amonia
    async getDataChartAmonia(req, res) {
        data7 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time6, amonia FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data7.rowCount,
            result:data7.rows,
        })
        console.log("[REST-API DIPASENA] GET DATA AMONIA 60");
    },


    

}
