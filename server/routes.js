var helpers = require('./helpers');
var Firebase = require('firebase');
module.exports = function(app, Models, openTok, fireUrl) {
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
   res.render('question', {
     id: req.params.id
   });
  });
  /* user posts a question and gets redirected to /question/:id */
  app.post('/question', helpers.isLoggedIn, function(req, res) {
    var tags = req.body.tags.split(',');
    var desc = req.body.desc;
    var location = '127.0.0.1';
    openTok.createSession(location, {'p2p.preference':'enabled'}, function(result) {

      var question = Models.Question.createQuestion({
        profile_id   : req.profile.id,
        desc         : desc,
        tags         : tags,
        openTok_sess : result
      });

      req.session.tokToken = opentok.generateToken({
        session_id: result,
        role: OpenTok.RoleConstants.PUBLISHER,
        connection_data: '/question/' + question
      });
      res.redirect('/question/' + question)

    });
    // create a room
    res.redirect('/dashboard');
  });

  app.get('/questions', helpers.isLoggedIn, function(req, res) {
    res.render('questions', {
      session: req.session
    });
  });

  app.get('/', function(req, res) {
    if (req.session.accessToken) {
      res.redirect('/dashboard');
    } else {
      res.render('index', {
        session: req.session
      });
    }
  });
  return app;
};
  