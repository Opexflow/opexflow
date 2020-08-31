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

const sql = 'SELECT balance FROM Transactions  WHERE id=2 AND balance>=1000';

connection.query(sql, (err, results) => {
    if (err) throw err;
    if (results && results.length === 0) {
        console.log('Not enough money');
    } else {
        console.log(results);

        /* Begin transaction */
        connection.beginTransaction(err => {
            if (err) {
                throw err;
            }

            connection.query({
                sql: 'UPDATE Transactions Set balance = balance - ? where ?',
                values: [1000, { id: 1 }],
            },
            (error, results, fields) => {
                if (error) {
                    return connection.rollback(() => {
                        throw error;
                    });
                }

                const log = `Transactions ${results.insertId} added`;

                connection.query({
                    sql: 'UPDATE Transactions Set balance = balance + ? where ?',
                    values: [1000, { id: 2 }],
                },
                (error, results, fields) => {
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
            });
        });
        /* End transaction */
    }
});
