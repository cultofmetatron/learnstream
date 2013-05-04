var express = require('express');
var http = require('http');
var path = require('path');
//var stream = require('stream');
var querystring = require('querystring');
var Q    = require('q');
var everyauth = require('everyauth');
var helpers = require('./helpers');
var browserify = require('browserify-middleware');

module.exports = function(configs) {
  var app = express();
  everyauth.debug = true;

  var fireUrl = 'https://realstateappointments.firebaseIO.com/';
  var Firebase = require('firebase');

  Models = {
    Root : new Firebase(fireUrl),
    User : require('./models/user.js')(new Firebase(fireUrl + 'users'), everyauth)
  };

  Models.Root.set('realestater');


  app.set('port', process.env.PORT || 3000);
  app.set('views');

  app.set(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('kjgkab2317hgsblab;vaigliq2106'));
  app.use(express.session());
  app.use(express.methodOverride());
  app.use(everyauth.middleware(app));
  app.use(helpers.allowCrossDomain);
  app.use(express.static(path.join(configs.rootDir, 'public')));
  app.use('/js', browserify(path.join(configs.rootDir, 'scripts')) );
  app.use(app.router);

  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  app = require('./routes.js')(app);


  return app;
};










