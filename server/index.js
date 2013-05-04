var express = require('express');
var http = require('http');
var path = require('path');
var querystring = require('querystring');
var Q = require('q');
var everyauth = require('everyauth');
var helpers = require('./helpers');

module.exports = function(configs) {
  var hostBaseUrl = 'http://localhost:3000';
  var app = express();
  everyauth.debug = true;
  var expressSingly = require('express-singly')(app,
    configs.singly.clientId,
    configs.singly.clientSecret,
    hostBaseUrl, hostBaseUrl + '/callback');

  var fireUrl = 'https://realstateappointments.firebaseIO.com/';
  var Firebase = require('firebase');

  Models = {
    Root : new Firebase(fireUrl),
    User : require('./models/user.js')(new Firebase(fireUrl + 'users'), everyauth)
  };

  Models.Root.set('learnstream');

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
  app.use(helpers.allowCrossDomain); //fixes cors bullshit
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
