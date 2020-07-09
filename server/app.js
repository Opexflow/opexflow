const express         =     require('express')
  , passport          =     require('passport')
  , FacebookStrategy  =     require('passport-facebook').Strategy
  , session           =     require('express-session')
  , cookieParser      =     require('cookie-parser')
  , bodyParser        =     require('body-parser')
  , config            =     require('./config')
  , mysql             =     require('mysql')
  , app               =     express();

//Define MySQL parameter in Config.js file.
const pool = mysql.createPool({
  host     : config.host,
  user     : config.username,
  password : config.password,
  database : config.database
});

// Passport session setup.
passport.serializeUser(function(user, done) {
    console.log('serializeUser');
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('deserializeUser');
  done(null, obj);
});


// Use the FacebookStrategy within Passport.

passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(profile);
      //Check whether the User exists or not using profile.id
        pool.query("SELECT * from Users where id="+profile.id, (err,rows) => {
          if(err) throw err;
          if(rows && rows.length === 0) {
              console.log("There is no such user, adding now");
              pool.query("INSERT into Users(id,login) VALUES('"+profile.id+"','"+profile.displayName+"')");
          } else {
              console.log("User already exists in database");
          }
        });

      profile.accessToken = accessToken;

      return done(null, profile);
    });
  }
));

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret123', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api', function(req, res){
  // res.render('index', { user: req.user });
  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify({ user: req.user }));
  // console.log('/', req, res);

  if (req.isAuthenticated()) {
    res.redirect(`https://${req.hostname}/`);
  } else {
    res.redirect(`https://${req.hostname}/api/auth/facebook`);
  }
});

app.get('/api/account', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', `https://${req.hostname}`);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie, *');

  // res.render('account', { user: req.user });
  if (!req.isAuthenticated()) {
    res.end('{}');
  }

  res.end(JSON.stringify({ user: req.user }));
});

app.get('/api/account/:id', function(req, res){
  pool.query("SELECT * from Users where id="+req.params.id, (err,rows) => {
    if (err) {
      return res.end('{}');
    }
    res.end(JSON.stringify(rows));
  });
});


app.get('/api/auth/facebook', passport.authenticate('facebook',{scope:'email'}));


app.get('/api/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/user/login' }),
  function(req, res) {
    // console.log('/callback', req, res);

    res.redirect('/');
  });

app.get('/api/logout', function(req, res){
  req.logout();
  return res.end('{}');
});

function ensureAuthenticated(req, res, next) {
  // console.log('ens')
  //if (req.isAuthenticated()) { return next(); }
  //console.log('redir');
  //res.redirect('/user/login')
  return next();
}

app.listen(3001);
