const express = require("express");
const mysql = require("mysql2")
const mysqltorest =  require ('mysql-to-rest');
const app = express();
const {FB, FacebookApiException} = require('fb');


const PORT = 4000;
const SESSION_SECRECT = 'bad secret';

var token = "EAApVH7ZB4Ah0BAHhoSBRjwGLM8XOu75r6IYZBsjJBxv63ZAArjTsyo3EtY9HsR61iZAvNgCYUViVQRy1G8Wo9yZA7evsvXOazyNyUmTiKFdyo56WB3VdShVGmHkzQzUGZCNXk7kDejmx9PleeHRzDkprZByj39TENRvARHCZBrKuXSa38kQ5l7VvWORy1abYdCcZD"
FB.api('/me', 'get', { access_token: token, fields: 'id,name,gender,email' }, function(response) {
  console.log(response);
  let user = response;
});






const connection = mysql.createConnection({
    host: "78.24.216.16",
    user: "opexbetausr",
    password: "P6y5H0e9",
    database: "opexbetadb"
});



// тестирование подключения
connection.connect(function(err){
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else{
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});
// закрытие подключения
connection.end(function(err) {
if (err) {
  return console.log("Ошибка: " + err.message);
}
console.log("Подключение закрыто");
});

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});