//load the stream of questions
(function() {
  //rooms models

  window.Question = Backbone.Model.extend({
    defaults: function() {
      return {
        desc: "Just teach me something... The readbull is too strong and all hear are the spheres of valhala"
      };
    },
    initialize: function() {
      //initialization code
      if (!this.get('desc')) {
        this.set({'title':this.defaults().title });
      }
    }

  });

  window.Tag = Backbone.Model.extend({
    defaults: function() {
      return {


      };
    }

  });

  window.Questions = Backbone.Firebase.Collection.extend({
    model: Question,
    firebase: 'https://learnstream-fuu.firebaseio.com/'
  });




}).call(this);







