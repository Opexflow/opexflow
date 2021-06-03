const express = require('express');

const router = express.Router();

const { getAllProposalsForJob, submitProposal } = require('../../services/proposal');
const { setHeaders, setHeadersWithoutAuth } = require('../../middlewares/setHeaders');

//router.use('/', setHeaders);

router.get('/', setHeadersWithoutAuth, getAllProposalsForJob);

router.post('/', setHeaders, submitProposal);

module.exports = router;
