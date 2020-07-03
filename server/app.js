const express = require("express");
const mysql = require("mysql")
const mysqltorest =  require('mysql-to-rest');
const app = express();


const connection = mysql.createConnection({
    host: "78.24.216.16",
    user: "opexbetausr",
    password: "P6y5H0e9",
    database: "opexbetadb"
});

connection.connect();
console.log('aplication is running');

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
  const api =  mysqltorest(app, connection);  
  app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
  });

  connection.end();