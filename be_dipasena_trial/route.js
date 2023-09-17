const router = require('express').Router();
const dipasena_http = require('./controler_http.js');

router.get('/dipasena/latest', dipasena_http.getDataDipasena);// route request to respond lastest 100 data
router.get('/dipasena/tabel', dipasena_http.getDataTabel);// route request to respond lastest 100 data
router.get('/dipasena/chart/suhuAir', dipasena_http.getDataChartSuhuPer);
router.get('/dipasena/chart/ph', dipasena_http.getDataChartPh);
router.get('/dipasena/chart/do', dipasena_http.getDataChartDo);
router.get('/dipasena/chart/salinitas', dipasena_http.getDataChartSalinitas);
router.get('/dipasena/chart/suhuRuang', dipasena_http.getDataChartSuhuRuang);
router.get('/dipasena/chart/amonia', dipasena_http.getDataChartAmonia);

module.exports = router;