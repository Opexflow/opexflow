const config = require('../config');
const { replaceHost } = require('../helpers/utils');

const setResponseHeaders = (req, res) => {
  // TODO: сделать общее решение для локальной разработки.
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', replaceHost(config.HOSTNAME));
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

  if (!req.isAuthenticated() || !req.user || !req.user.id) {
      return res.end('{}');
  }
};

const setHeaders = (req, res, next) => {
  setResponseHeaders(req, res);
  next();
}

module.exports = { setHeaders };