
/**
 * Module dependencies.
 */

var express = require('express');
var cors = require('cors');
var routes = require('./routes/index.js');
var apiRoutes = require('./routes/api.js');
var http = require('http');
var path = require('path');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var passport = require('passport');
var mongoose = require('mongoose');
var faye = require('faye');

var app = express();
var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

// config elements
var dbConfig = require('./config/database.js');
var passportConfig = require('./config/passport.js');
var secret = "ilovescotchyscotchandyousouldtoo";

mongoose.connect(dbConfig.url);

// models
var user = require('./models/user.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/api', expressJwt({ secret: secret }));
app.use(cors())
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
app.use(passport.initialize());
passportConfig(passport);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

apiRoutes(app, cors, passport, bayeux);
routes(app, cors, passport, jwt, secret);

var server = http.createServer(app);

bayeux.attach(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
