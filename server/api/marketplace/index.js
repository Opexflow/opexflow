const express = require('express');

const router = express.Router();


const jobs = require('./jobs');
const proposal = require('./proposal');
const chat = require('./chat');
const message = require('./message');

router.use('/', jobs);

router.use('/proposal', proposal);

router.use('/chat', chat);

router.use('/message', message);

// router.get('/', setHeadersWithoutAuth, getAllJobs);

// router.post('/proposal', setHeaders, applyJob);

// router.post('/', setHeaders, createJob);



module.exports = router;
