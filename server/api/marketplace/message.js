const express = require('express');

const router = express.Router();

const { setHeaders } = require('../../middlewares/setHeaders');
const { getMessagesByChatId } = require('../../services/message');

router.get('/', setHeaders, getMessagesByChatId);

module.exports = router;
