const express = require('express');
const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');
const router = express.Router();
const config = require('../config');
const {replaceHost} = require('../helpers/utils');

// Program to Monitor MySql for any chagne
const monitorOrderBookDB = async (pool, io) => {
  const connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password
  });

  const instance = new MySQLEvents(connection, {
    startAtEnd: true // to record only the new binary logs, if set to false or you didn'y provide it all the events will be console.logged after you start the app
  });

  await instance.start();

  instance.addTrigger({
    name: 'monitoring all statments',
    expression: `${config.database}.*`, // listen to opexbetadb database !!!
    statement: MySQLEvents.STATEMENTS.ALL, // all type of operations, for insert alone MySQLEvents.STATEMENTS.INSERT, 
    onEvent: () => {
      let result = undefined;
      pool.query(`SELECT glass from history_siz0 ORDER BY id DESC LIMIT 1`, (err, rows) => {
          if (err) {
              return res.end('{}');
          }
          result = JSON.stringify(rows);
          io.emit('order-book:glass', result);
      });
    }
  });

  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

router.get('/', (req, res) => {
  // TODO: сделать общее решение для локальной разработки.
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', replaceHost(config.HOSTNAME));
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

  if (!req.isAuthenticated() || !req.user || !req.user.id) {
      return res.end('{}');
  }

  const pool = req.app.get('pool');
  const io = req.app.get('io');

  monitorOrderBookDB(pool, io)
  .then(
      console.log('Connection Established, Monitoring DB for any change.')
  )
  .catch(console.error);
  pool.query(`SELECT glass from history_siz0 ORDER BY id DESC LIMIT 1`, (err, rows) => {
      if (err) {
          console.log("err is", err);
          return res.end('{}');
      }
      res.end(JSON.stringify(rows));
  });
});

module.exports = router;