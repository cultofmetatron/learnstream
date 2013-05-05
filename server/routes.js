var helpers = require('./helpers');
var Firebase = require('firebase');
var OpenTok = require('opentok');

module.exports = function(app, Models, openTok, fireUrl, configs) {

  app.get('/dashboard', helpers.isLoggedIn, function(req, res) {
    console.log(req.session);
    res.render('dashboard', {
      session: req.session
    });
  });


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
      opentok_key : configs.opentok.apikey
    });
  });


  app.post('/question', helpers.isLoggedIn, function(req, res) {
    var tags = req.body.tags.split(',');
    var desc = req.body.desc;
    var location = '127.0.0.1';
    openTok.createSession(location, {'p2p.preference':'enabled'}, function(result) {

// <<<<<<< HEAD
//       var question = Models.Question.createQuestion({
//         profile_id   : req.profile.id,
//         desc         : desc,
//         tags         : tags,
//         openTok_sess : result
//       });
//       req.session.tokToken = opentok.generateToken({
//         session_id: result,
//         role: OpenTok.RoleConstants.PUBLISHER,
//         connection_data: '/question/' + question
//       });
//       res.redirect('/question/' + question)
//     });
//     // Create a room.
//     res.redirect('/dashboard');
// =======
      fireRef = new Firebase(fireUrl + '/questions/');
      newQuestion = fireRef.push();
      newQuestion.set({
        id           : newQuestion.name(),
        desc         : desc,
        tags         : tags,
        profile_id   : req.session.profiles.id,
        openTok_sess : result
      });
      res.redirect('/question/' + newQuestion.name());
    });
    // create a room
    //res.redirect('/dashboard');
// >>>>>>> 3a9e720e02f4ada39b34cd478c89893f75c5870e
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
