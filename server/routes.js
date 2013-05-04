module.exports = function(app) {
  /* place routes here */

  app.get('/test', function(req, res) {
    res.render('test', {});

  });

  return app;

};
