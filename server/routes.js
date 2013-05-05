module.exports = function(app) {
  /* place routes here */

  app.get('/dashboard', function(req, res) {
    console.log(req.session);
    res.render('dashboard', {
      session: req.session
    });

  });

  app.get('/', function(req, res) {
    res.render('index', {
      session: req.session
    });
  });

  return app;

};
