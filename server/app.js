const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const params = require('express-route-params');
const cors = require('cors');
const config = require('./config');
const orderBook = require('./api/orderBook');
const commands = require('./api/commands');
const { replaceHost } = require('./helpers/utils');
const mongo = require('./helpers/mongoClient');
const { saveOrUpdateUser } = require('./services/users');

const app = express();
params(express);

app.use(cors({origin: replaceHost(config.HOSTNAME)}));

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

// Websocket between client and server
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    path: '/api/socket/data',
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

io.on('connection', () => {
    console.log('A user is connected');
});

app.set('pool', pool);
app.set('io', io);

var chatIO = require('./utils/chatIO').initialize(http);
const marketplace = require('./api/marketplace')


async function start() {
  await mongo.init();
}
start();

passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret: config.facebook_api_secret,
    callbackURL: config.callback_url,
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos'],
},
((accessToken, refreshToken, profile, done) => {
    process.nextTick(async () => {
        console.log(profile);
        if (profile && profile.id) {

            await saveOrUpdateUser(profile, mongo);
            /*
            pool.query(`INSERT INTO Users SET
                    id = '${profile.id}', login = '${profile.displayName}', email = '${email}', photo='${photo}', createdAt = NOW(), balance = 10000
                    ON DUPLICATE KEY UPDATE login = '${profile.displayName}', email = '${email}', photo='${photo}'
                `);
            */

            profile.accessToken = accessToken;
        }
        return done(null, profile);
    });
})));


passport.use(new GitHubStrategy({
  clientID: config.github_api_key,
  clientSecret: config.github_api_secret,
  callbackURL: config.github_callback_url,
  profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos'],
},
((accessToken, refreshToken, profile, done) => {
  process.nextTick(async () => {
      console.log('github profile', profile);
      if (profile && profile.id) {
          await saveOrUpdateUser(profile, mongo);
          /*
          pool.query(`INSERT INTO Users SET
                  id = '${profile.id}', login = '${profile.displayName}', email = '${email}', photo='${photo}', createdAt = NOW(), balance = 10000
                  ON DUPLICATE KEY UPDATE login = '${profile.displayName}', email = '${email}', photo='${photo}'
              `);
          */

          profile.accessToken = accessToken;
      }
      return done(null, profile);
  });
})));

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret123', key: 'sid' })); // , resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

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

app.get('/api/account', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', replaceHost(HOSTNAME));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

    // res.render('account', { user: req.user });
    if (!req.isAuthenticated() || !req.user || !req.user.id) {
        return res.end('{}');
    }
    
    /*
    pool.query(`SELECT * from Users where id=${req.user.id}`, (err, rows) => {
        res.end(JSON.stringify({ user: req.user, finance: { balance: rows && rows[0] && rows[0].balance } }));
    });
    */
    const user = await mongo.getUserObject().getUser(req.user.id);
    res.end(JSON.stringify({ user: req.user, finance: { balance: user.balance } }));
});

app.get('/api/account/:id', async (req, res) => {
  /*    
    pool.query(`SELECT * from Users where id=${req.params.id}`, (err, rows) => {
        if (err) {
            return res.end('{}');
        }
        res.end(JSON.stringify(rows));
    });
  */
    const user = await mongo.getUserObject().getUser(req.user.id);
    res.end(JSON.stringify(user));  
});

app.get('/api/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/user/login' }),
    (req, res) => {
        // console.log('/callback', req, res);
        res.redirect('/');
    });


app.get('/api/auth/github', passport.authenticate('github'));

app.get('/api/auth/github/callback', 
    passport.authenticate('github', { successRedirect: '/', failureRedirect: '/user/login' }),
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
app.get('/api/stocks/trades/buy/:price', ensureAuthenticated, async (req, res) => {
    // TODO: сделать общее решение для локальной разработки.
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', replaceHost(HOSTNAME));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

    if (!req.isAuthenticated() || !req.user || !req.user.id) {
        return res.end('{}');
    }

    //pool.query(`UPDATE Users SET balance = balance - '${req.params.price}' WHERE id = '${req.user.id}'`);
    var query = { _id: req.user.id.toString() };
    const newUser = { "$inc": { "balance": -req.params.price } };
    await mongo.getUserObject().updateOrInsertUser(query, newUser, {upsert: false});
    return res.end(JSON.stringify({}));
});

app.get('/api/stocks/trades/sell/:price', ensureAuthenticated, async (req, res) => {
    // TODO: сделать общее решение для локальной разработки.
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', replaceHost(HOSTNAME));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

    if (!req.isAuthenticated() || !req.user || !req.user.id) {
        return res.end('{}');
    }

    //pool.query(`UPDATE Users SET balance = balance + '${req.params.price}' WHERE id = '${req.user.id}'`);
    var query = { _id: req.user.id.toString() };
    const newUser = { "$inc": { "balance": +req.params.price } };
    await mongo.getUserObject().updateOrInsertUser(query, newUser, {upsert: false});
    return res.end(JSON.stringify({}));
});

app.use('/api/order-book', ensureAuthenticated, orderBook);

app.use('/api/commands', ensureAuthenticated, commands);

app.use('/api/marketplace', ensureAuthenticated, marketplace);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next() }
    // res.redirect('/user/login')
    return next();
}

// app.listen(3001);
var server = http.listen(3001, () => {
    console.log('server is running on port', server.address().port);
});
