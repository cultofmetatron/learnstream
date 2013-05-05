var __ = require('underscore');
module.exports = function(firebaseAccess) {
  var firebaseQuestion = {};
  //firebaseUser.__proto__ = firebaseAccess;

  firebaseQuestion.createQuestion = function(ques) {
    var newQuestion = firebaseAccess.push();
    newQuestion.set({profile_id: ques.profile_id, desc: ques.desc, tags: ques.tags });
    return newQuestion;
  };

  firebaseQuestion.findQuestion = function(id) {


  };

  firebaseQuestion.getQuestions = function(tags) {


  };


  return firebaseQuestion;
};
