const axios = require('axios');
const fs = require('fs');
const path = require('path');

const replaceHost = host => host.replace('http:', 'https:').replace('3001', '3000');


const downloadImageStream = (url, imagePath) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(imagePath))
          .on('finish', () => resolve({ 'success': true, imagePath }))
          .on('error', e => reject({ 'success': false, error: e }));
      })
      //.then(response => response)
      //.catch(error => error),
  )
  .catch(error => { return {'success:': false, error }});


const loadImageForUser = async (photo) => {
  var file = path.join(photo);

  
  var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
  };
  
  var type = mime[path.extname(file).slice(1)] || 'image/jpeg';
  /*
  var s = fs.createReadStream(file);
  var stringStream = '';
  
  // s.on('open', function (chunk) {
  //     res.set('Content-Type', type);
  //     s.pipe(res);
  // });

  
  return new Promise((resolve, reject) => {

    s.on("data", chunk => stringStream += chunk);
    s.on("end", () => resolve({ 'success': true, stringStream }));
    s.on('error', function (e) {
        //res.set('Content-Type', 'text/plain');
        //res.status(404).end('Not found');
        reject({ 'success': false, error: e })
    });
  });*/

  return "data:" + type + ";base64," + fs.readFileSync(file, 'base64');
}

module.exports = { replaceHost, downloadImageStream, loadImageForUser };
