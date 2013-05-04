module.exports = function(app) {
  /* place routes here */

  app.get('/', function(req, res) {
    res.render('index', {});

  });

  return app;

};
