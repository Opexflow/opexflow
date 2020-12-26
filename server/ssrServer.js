const express = require('express');
const path = require('path');
const serverRenderer = require('./middleware/serverRenderer');

const PORT = 3000;

const ssrApp = express();

ssrApp.get('/*', serverRenderer);

ssrApp.use(express.static(path.resolve(__dirname, '..', 'build')));

ssrApp.use(serverRenderer);

ssrApp.listen(PORT, () => console.log(`Client listening on port ${PORT}!`));