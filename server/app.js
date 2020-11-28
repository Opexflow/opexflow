const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const params = require('express-route-params');
const config = require('./config');

const app = express();
params(express);

// Define MySQL parameter in Config.js file.
const pool = mysql.createPool({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database,
});

// Passport session setup.
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

const HOSTNAME = 'http://localhost:3000';
config.callback_url = 'http://localhost:3001/api/auth/facebook/callback';
config.facebook_api_secret = '8f891ee90229fd861d4c71bdf648ad14';
config.facebook_api_key = '2640133479605924';

// let HOSTNAME = 'https://opexflow.com';

passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret: config.facebook_api_secret,
    callbackURL: config.callback_url,
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos'],
},
((accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
        console.log(profile);
        if (profile && profile.id) {
            const photo = profile.photos && profile.photos[0] && profile.photos[0].value || '';
            const email = profile.emails && profile.emails[0] && profile.emails[0].value || '';

            pool.query(`INSERT INTO Users SET
                    id = '${profile.id}', login = '${profile.displayName}', email = '${email}', photo='${photo}', createdAt = NOW(), balance = 10000
                    ON DUPLICATE KEY UPDATE login = '${profile.displayName}', email = '${email}', photo='${photo}'
                `);
        clientID: config.facebook_api_key,
        clientSecret: config.facebook_api_secret,
        callbackURL: config.callback_url,
        profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos']
    },
    ((accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            console.log(profile);
            if (profile && profile.id) {
                const photo = profile.photos && profile.photos[0] && profile.photos[0].value || '';
                const email = profile.emails && profile.emails[0] && profile.emails[0].value || '';

                pool.query(`SELECT * from Users where id=${profile.id}`, (err, rows) => {
                    if (err) throw err;
                    if (rows && rows.length === 0) {
                        console.log('There is no such user, adding now');
                        pool.query(`INSERT INTO Users SET id = '${profile.id}', login = '${profile.displayName}', email = '${email}', photo='${photo}'`);
                    } else {
                        console.log('User already exists in database');
                    }
                });

                pool.query(`SELECT * from Transactions where id='${profile.id}'`, (err, rows) => {
                    if (err) throw err;
                    if (rows && rows.length === 0) {
                        console.log('There is no balance User in Transaction, adding now');
                        pool.query(`INSERT INTO Transactions SET id = '${profile.id}'`);
                    } else {
                        console.log('Balance for User already exists in database');
                    }
                });

            profile.accessToken = accessToken;
        }
        return done(null, profile);
    });
})));



// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

function replaceHost(host) {
    return host.replace('http:', 'https:').replace('3001', '3000');
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret123', key: 'sid' })); //, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api', (req, res) => {
    // res.render('index', { user: req.user });
    // res.setHeader('Content-Type', 'application/json');
    // res.end(JSON.stringify({ user: req.user }));
    // console.log('/', req, res);

    if (req.isAuthenticated()) {
        res.redirect(replaceHost(HOSTNAME));
    } else {
        res.redirect(`${HOSTNAME}api/auth/facebook`);
    }
});

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect(replaceHost(HOSTNAME));
    } else {
        res.redirect(`${HOSTNAME}api/auth/facebook`);
    }
});

app.get('/api/account', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', replaceHost(HOSTNAME));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

    // res.render('account', { user: req.user });
    if (!req.isAuthenticated() || !req.user || !req.user.id) {
        return res.end('{}');
    }

    pool.query(`SELECT * from Users where id=${req.user.id}`, (err, rows) => {
        res.end(JSON.stringify({ user: req.user, finance: { balance: rows && rows[0] && rows[0].balance } }));
    });
    /*    pool.query(`SELECT user from Users where id=${req.user.id}` , (err, rows) => {
            res.end(JSON.stringify({ user: req.user, finance: { balance: rows && rows[0] && rows[0].balance }}));
        })*/
    pool.query(`SELECT * from Users,Transactions WHERE Users.id=Transactions.id`, (err, rows) => {
        res.end(JSON.stringify({ user: req.user, finance: { balance: rows && rows[0] && rows[0].balance }}));
    })
});

app.get('/api/account/:id', (req, res) => {
    pool.query(`SELECT * from Users where id=${req.params.id}`, (err, rows) => {
        if (err) {
            return res.end('{}');
        }
        res.end(JSON.stringify(rows));
    });
});

app.get('/api/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/user/login' }),
    (req, res) => {
        // console.log('/callback', req, res);
        res.redirect('/');
    });

app.get('/api/logout', (req, res) => {
    req.logout();
    return res.end('{}');
});

app.param('tick', /^\d+(min|h|d|m)$/i);

// ========= Работа с тиками ==========
app.get('/api/stocks/ticks/:tick', ensureAuthenticated, (req, res) => {
    // TODO: сделать общее решение для локальной разработки.
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', replaceHost(HOSTNAME));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

    const filename = path.join(__dirname, `SBER_${req.params.tick[0]}.txt`);

    console.log(req.params);
    console.log(__dirname);
    console.log(filename);

    if (!fs.existsSync(filename)) {
        return res.end('{}');
    }

    console.log(filename);

    // Вместо этого файла будут данные из БД
    const ticks = fs.readFileSync(filename).toString()
        .split('\n')
        .slice(1)
        .map(s => s.trim())
        .filter(Boolean);

    return res.end(JSON.stringify(ticks));
});

app.param('price', /^\d+\.?\d*$/i);


// ========= Работа с тиками ==========
app.get('/api/stocks/trades/buy/:price', ensureAuthenticated, (req, res) => {
    // TODO: сделать общее решение для локальной разработки.
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', replaceHost(HOSTNAME));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

    if (!req.isAuthenticated() || !req.user || !req.user.id) {
        return res.end('{}');
    }

    const sql = `SELECT balance FROM Transactions  WHERE id='${req.user.id}' AND balance>=${req.params.price}`;
    const transaction = `UPDATE Transactions SET stock='SBER', commission=0, price=${req.params.price}+commission, balance = balance - price WHERE id='${req.user.id}'`
    const logs = `INSERT INTO Transactions_logs(id,balance,price,commission,stock) SELECT id,balance,price,commission,stock FROM Transactions WHERE id='${req.user.id}')`

    pool.getConnection(function (err, connection) {

        connection.query(sql, (err, results) => {
            if (err) throw err;
            if (results && results.length === 0) {
                connection.release();
                console.log('Not enough money');
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {                  //Transaction Error (Rollback and release connection)
                        connection.rollback(function () {
                            connection.release();
                            console.log('connection is lost')
                            //Failure
                        });
                    } else {
                        connection.query(transaction, function (err, results) {
                            if (err) {          //Query Error (Rollback and release connection)
                                connection.rollback(function () {
                                    connection.release();
                                    console.log('no money');
                                });
                            } else {
                                connection.commit(function (err) {
                                    if (err) {
                                        connection.rollback(function () {
                                            connection.release();
                                            console.log('lost!');
                                        });
                                    } else {
                                        connection.release();
                                        console.log(`'balance update - '${req.params.price}`);
                                        console.log('success!');
                                        connection.query(logs, (err, results) => {
                                            console.log('Transactions logs added');
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
});



app.get('/api/stocks/trades/sell/:price', ensureAuthenticated, (req, res) => {
    // TODO: сделать общее решение для локальной разработки.
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', replaceHost(HOSTNAME));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

    if (!req.isAuthenticated() || !req.user || !req.user.id) {
        return res.end('{}');
    }

    const sql = `SELECT balance FROM Transactions  WHERE id='${req.user.id}' AND balance>=${req.params.price}`;
    const transaction = `UPDATE Transactions SET stock='SBER', commission=0, price=${req.params.price}+commission, balance = balance + price WHERE id='${req.user.id}'`
    const logs = `INSERT INTO Transactions_logs(id,balance,price,commission,stock) SELECT id,balance,price,commission,stock FROM Transactions WHERE id='${req.user.id}')`

    pool.getConnection(function (err, connection) {

        connection.query(sql, (err, results) => {
            if (err) throw err;
            if (results && results.length === 0) {
                connection.release();
                console.log('Not enough money');
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {                  //Transaction Error (Rollback and release connection)
                        connection.rollback(function () {
                            connection.release();
                            console.log('connection is lost')
                            //Failure
                        });
                    } else {
                        connection.query(transaction, function (err, results) {
                            if (err) {          //Query Error (Rollback and release connection)
                                connection.rollback(function () {
                                    connection.release();
                                    console.log('no money');
                                });
                            } else {
                                connection.commit(function (err) {
                                    if (err) {
                                        connection.rollback(function () {
                                            connection.release();
                                            console.log('lost!');
                                        });
                                    } else {
                                        connection.release();
                                        console.log(`'balance update + '${req.params.price}`);
                                        console.log('success!');
                                        connection.query(logs, (err, results) => {
                                            console.log('Transactions logs added');
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next() }
    // res.redirect('/user/login')
    return next();
}

// Transaction


app.listen(3001);
