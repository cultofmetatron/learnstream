var helpers = require('./helpers');
module.exports = function(app) {
  /* place routes here */

  app.get('/dashboard', helpers.isLoggedIn ,function(req, res) {
    console.log(req.session);
    res.render('dashboard', {
      session: req.session
    });

  });
  /* user gets a list of all outstanding questions */
  app.get('/question/:id', helpers.isLoggedIn, function(req, res) {


  });
  /* user posts a question and gets redirected to /question/:id */
  app.post('/question', helpers.isLoggedIn, function(req, res) {


  });

  app.get('/questions', helpers.isLoggedIn, function(req, res) {


  });


  app.get('/', function(req, res) {
    res.render('index', {
      session: req.session
    });
  });

  return app;

};
