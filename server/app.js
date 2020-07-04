const express = require("express");
const mysql = require("mysql")
const mysqltorest =  require ('mysql-to-rest');
const app = express();


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