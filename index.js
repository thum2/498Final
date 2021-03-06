const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const config = require('./config');
const User = require('./');
const router = express.Router();
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const user = require('./backend/routes/users');
const pet = require('./backend/routes/pets');
const comment = require('./backend/routes/comments');
const session = require('express-session');

app.use(express.static('./backend/static/'));
app.use(express.static('./frontend/dist/'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Static routes
app.route('/').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});

app.route('/login').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/lostpage').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});

app.route('/foundpage').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});

app.route('/search').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});

app.route('/register').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});

app.route('/dashboard').get(function(req,res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})
app.route('/detailview/:id').get(function(req,res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})

app.route('/petsfound').get(function(req,res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});

app.route('/notifications').get(function(req, res) {
	return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});

/* New things ================================================================ */

require('./backend/models').connect(config.dbUri);
require('./backend/auth/passport')(passport);

// Initialize cookie sessions
app.use(cookieParser('secret'));
app.use(cookieSession({
  keys: ['asdf', 'asdf']
}));

app.use(require("express-session")({
  secret: 'secret',
  saveUnitialized: false,
  resave: false
}));

// Initialize Passport
app.use(passport.initialize()); // Create an instance of Passport
app.use(passport.session());

// Get our routes
app.use('/api', require('./backend/routes/api')(router, passport));
app.use('/api/users', user);
app.use('/api/pets', pet);
app.use('/api/comments', comment);
/* =========================================================================== */

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
