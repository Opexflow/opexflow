const config = require('../config');
const { replaceHost } = require('../helpers/utils');

const setResponseHeaders = (req, res) => {
    // TODO: сделать общее решение для локальной разработки.
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', replaceHost(config.HOSTNAME));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');
};

const setHeaders = async (req, res, next) => {
    await setResponseHeaders(req, res);
    if (!req.isAuthenticated() || !req.user || !req.user.id) {
      console.log('not authenticated');
      return res.end('{}');
    } else 
      next();
};

const setHeadersWithoutAuth = async (req, res, next) => {
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', replaceHost(config.HOSTNAME));
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

  next();
}

module.exports = { setHeaders, setHeadersWithoutAuth };
