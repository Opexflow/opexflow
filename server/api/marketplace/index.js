const express = require('express');

const router = express.Router();


const jobs = require('./jobs');
const proposal = require('./proposal');

router.use('/', jobs);

router.use('/proposal', proposal);

// router.get('/', setHeadersWithoutAuth, getAllJobs);

// router.post('/proposal', setHeaders, applyJob);

// router.post('/', setHeaders, createJob);



module.exports = router;
