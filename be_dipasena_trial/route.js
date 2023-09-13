const router = require('express').Router();
const dipasena_http = require('./controler_http.js');

router.get('/dipasena/latest', dipasena_http.getDataDipasena);// route request to respond lastest 100 data
router.get('/dipasena/tabel', dipasena_http.getDataTabel);// route request to respond lastest 100 data

module.exports = router;