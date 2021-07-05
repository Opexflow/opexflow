const express = require('express');

const router = express.Router();

//const message = require('./message');

const { getChatList, getChatByProposalId, createChat } = require('../../services/chat');
const { setHeaders } = require('../../middlewares/setHeaders');

//router.use('/message', setHeaders, message);

router.get('/proposal', setHeaders, getChatByProposalId);

router.get('/', setHeaders, getChatList);

router.post('/', setHeaders, createChat);

module.exports = router;
