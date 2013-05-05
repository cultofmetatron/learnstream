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
   var questionId = req.params.id;

  });
  /* user posts a question and gets redirected to /question/:id */
  app.post('/question', helpers.isLoggedIn, function(req, res) {
    var tags = req.body.tags.split(',');
    var desc = req.body.desc;
    //create a room


    res.redirect('/dashboard');

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
