const express = require('express');

const router = express.Router();

const { createJob, getAllJobs } = require('../../services/marketplace');
const { setHeaders, setHeadersWithoutAuth } = require('../../middlewares/setHeaders');

//router.use('/', setHeaders);

router.get('/', setHeadersWithoutAuth, getAllJobs);

router.post('/', setHeaders, createJob);



module.exports = router;
