const config = require('../config');
const { replaceHost } = require('../helpers/utils');

const setResponseHeaders = (req, res) => {
    // TODO: сделать общее решение для локальной разработки.
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', replaceHost(config.HOSTNAME));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

    if (!req.isAuthenticated() || !req.user || !req.user.id) {
      return res.end('{}');
    }
};

const setHeaders = async (req, res, next) => {
    await setResponseHeaders(req, res);
    next();
};

const setHeadersWithoutAuth = async (req, res, next) => {
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', replaceHost(config.HOSTNAME));
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

  next();
}

module.exports = { setHeaders, setHeadersWithoutAuth };
