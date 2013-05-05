var express = require('express');
var http = require('http');
var path = require('path');
var querystring = require('querystring');
var Q = require('q');
var everyauth = require('everyauth');
var helpers = require('./helpers');
var OpenTok = require('opentok');
var __ = require('underscore');

module.exports = function(configs) {
  // OpenTok module
  var openTok = new OpenTok.OpenTokSDK(configs.opentok.apikey, configs.opentok.apiSecret);

  var hostBaseUrl = 'http://localhost:3000';
  var app = express();
  everyauth.debug = true;
  var expressSingly = require('express-singly')(app,
    configs.singly.clientId,
    configs.singly.clientSecret,
    hostBaseUrl, hostBaseUrl + '/callback');

  var fireUrl = 'https://learnstream-fuu.firebaseio.com/';
  var Firebase = require('firebase');

  Models = {
    Root : new Firebase(fireUrl),
    User : require('./models/user.js')(new Firebase(fireUrl + 'users')),
    Question : require('./models/question.js')(new Firebase(fireUrl + 'question'))
  };


  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(configs.rootDir, 'public'));
  app.set('view engine', 'ejs');
  app.set(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('kjgkab2317hgsblab;vaigliq2106'));
  app.use(express.session());
  app.use(express.methodOverride());
  app.use(everyauth.middleware(app));
  app.use(helpers.allowCrossDomain); // Fix CORS' bullshit
  app.use(function(req, res, next) {
    if (req.session.accessToken ) { req.session.firebaseUrl = fireUrl; }
    next();
  });

  app.use(express.static(path.join(configs.rootDir, 'public')));
  expressSingly.configuration();
  app.use(app.router);
  expressSingly.routes();

  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  app = require('./routes.js')(app);
  return app;
};
