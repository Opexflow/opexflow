const express = require('express');

const router = express.Router();

const { getAllProposalsForJob, submitProposal, deleteProposal, deleteProposalByJobId } = require('../../services/proposal');
const { setHeaders, setHeadersWithoutAuth } = require('../../middlewares/setHeaders');

//router.use('/', setHeaders);

router.get('/', setHeadersWithoutAuth, getAllProposalsForJob);

router.post('/', setHeaders, submitProposal);

//router.delete('/', setHeaders, deleteProposal);
router.delete('/', setHeaders, deleteProposalByJobId);

module.exports = router;
