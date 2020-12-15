const replaceHost = (host) => {
  return host.replace('http:', 'http:').replace('3001', '3000');
}

module.exports.replaceHost = replaceHost;