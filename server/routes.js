var helpers = require('./helpers');
var Firebase = require('firebase');
var OpenTok = require('opentok');
module.exports = function(app, Models, openTok, fireUrl, configs) {
  /* place routes here */

  app.get('/dashboard', helpers.isLoggedIn, function(req, res) {
    console.log(req.session);
    res.render('dashboard', {
      session: req.session
    });
  });
  /* userisplayed a video of all outstanding questions */
  app.get('/question/:id', helpers.isLoggedIn, function(req, res) {
   var questionId = req.params.id;
   var question = new Firebase(fireUrl + '/questions/' + questionId);

    question.on('value', function(ref) {
            req.session.tokToken = openTok.generateToken({
            session_id: ref.val().openTok_sess,
            role: OpenTok.RoleConstants.PUBLISHER,
            connection_data: '/question/' + newQuestion.name()
          });
          res.render('question', {
            id: question.name(),
            TokSession: ref.val().openTok_sess,
            session : req.session,
            profile_id : ref.val().profile_id,
            opentok_key : configs.opentok.apikey,
            desc : ref.val().desc,
            tags : ref.val().tags
          });
    });

  });

  /* user posts a question and gets redirected to /question/:id */
  app.post('/question', helpers.isLoggedIn, function(req, res) {
    var tags = req.body.tags.split(',');
    var desc = req.body.desc;
    var location = '127.0.0.1';
    openTok.createSession(location, {'p2p.preference':'enabled'}, function(result) {
      fireRef = new Firebase(fireUrl + '/questions/');
      newQuestion = fireRef.push();
      newQuestion.set({
          id: newQuestion.name(),
          desc: desc,
          tags: tags,
          profile_id : req.session.profiles.id,
          openTok_sess : result
      });
      res.redirect('/question/' + newQuestion.name());
    });
    // create a room
    //res.redirect('/dashboard');
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

