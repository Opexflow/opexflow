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
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
});

// Create values
const name = 'INSERT INTO Transactions(balance,prise,name) VALUES(10000, \'Alexandr Kamynin\', 1000)';
const balance = 'VALUES(1, 10000)';

connection.query(name, (err, results) => {
    if (err) console.log(err);
    console.log(results);
});

/* Begin transaction */
connection.beginTransaction(err => {
    if (err) {
        throw err
    }
    connection.query('INSERT INTO Transactions SET (id,balance) VALUES('
    1
    ', '
    10000
    ')', (error, results, fields) => {
        if (error) {
            return connection.rollback(() => {
                throw error;
            });
        }

        const log = `Transactions ${results.insertId} added`;

        connection.query('INSERT INTO log SET data=?', log, (error, results, fields) => {
            if (error) {
                return connection.rollback(() => {
                    throw error;
                });
            }
            connection.commit(err => {
                if (err) {
                    return connection.rollback(() => {
                        throw err;
                    });
                }
                console.log('success!');
            });
        });
    }
)
    ;
});
/* End transaction */
