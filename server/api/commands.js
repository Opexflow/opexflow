const express = require('express');

const router = express.Router();

const { sendCommandHandler } = require('../services/commands');
const { setHeaders } = require('../middlewares/setHeaders');

router.use('/', setHeaders);

router.get('/', sendCommandHandler);

module.exports = router;
