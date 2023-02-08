const express = require('express');
const queryParser = require('../middlewares/query-parser.middleware');
const miscController = require('./misc.controller');

const router = express.Router();

router.get('/cars', queryParser, miscController.listCars);
router.get('/leasings', queryParser, miscController.listCars);

module.exports = router;
