const mysql = require('mysql');
const config = require('./config');

// Define MySQL parameter in Config.js file.
const connection = mysql.createConnection(
    {
        host: '78.24.216.16',
        user: 'opexbetausr',
        password: 'P6y5H0e9',
        database: 'opexbetadb',
    },
);

connection.connect(err => {
    if (err) {
        console.error(`error connecting: ${ err.stack}`);
        return;
    }
    console.log(`connected as id ${ connection.threadId}`);
});

// create table

connection.query('CREATE DATABASE transactions',
    (err, results) => {
        if (err) console.log(err);
        else console.log('База данных транзакций');
    });

const sql = `create table if not exists transactions(
  id int primary key auto_increment,
  name varchar(255) not null,
  balanse int not varchart(1000)
)`;

connection.query(sql, (err, results) => {
    if (err) console.log(err);
    else console.log('Таблица создана');
});

// Create values
const name = 'INSERT INTO transactions(name, balance) VALUES(\'Alexandr\', 1000)';

connection.query(name, (err, results) => {
    if (err) console.log(err);
    console.log(results);
});

/* Begin transaction */
connection.beginTransaction(err => {
    if (err) { throw err }
    connection.query('INSERT INTO transactions SET', 'balance', (err, result) => {
        if (err) {
            connection.rollback(() => {
                throw err;
            });
        }

        const log = result.insertId;

        connection.query('ANOTHER QUERY PART OF TRANSACTION', log, (err, result) => {
            if (err) {
                connection.rollback(() => {
                    throw err;
                });
            }
            connection.commit(err => {
                if (err) {
                    connection.rollback(() => {
                        throw err;
                    });
                }
                console.log('Transaction Completed Successfully.');
                connection.end();
            });
        });
    });
});
/* End transaction */
