module.exports = function(app) {
  /* place routes here */

  app.get('/', function(req, res) {
    res.render('index', {
      session: req.session
    });

  });

  return app;

};
