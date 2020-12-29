const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const serverRenderer = require('./middleware/serverRenderer');

const PORT = 3000;

const ssrApp = express();

ssrApp.get('/*', serverRenderer);

ssrApp.use(express.static(path.resolve(__dirname, '..', '..', 'build')));

ssrApp.use(serverRenderer);

const httpsServer = https.createServer({
    key: fs.readFileSync(__dirname + '/security/server.key'),
    cert: fs.readFileSync(__dirname + '/security/server.cert')
}, ssrApp);

httpsServer.listen(PORT, () => console.log(`Client listening on port ${PORT}!`));