module.exports = function(app) {
  /* place routes here */

  app.get('/dashboard', function(req, res) {
    console.log(req.session);
    res.render('dashboard', {
      session: req.session
    });

  });

  return app;

};
