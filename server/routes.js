var helpers = require('./helpers');
module.exports = function(app) {
  /* place routes here */

  app.get('/dashboard', helpers.isLoggedIn ,function(req, res) {
    console.log(req.session);
    res.render('dashboard', {
      session: req.session
    });

  });

  app.get('/room/:id', helpers.isLoggedIn, function(req, res) {


  });


  app.get('/', function(req, res) {
    res.render('index', {
      session: req.session
    });
  });

  return app;

};
