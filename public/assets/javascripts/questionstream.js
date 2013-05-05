//load the stream of questions
(function() {
  //rooms models

  window.Question = Backbone.Model.extend({
    defaults: function() {
      return {
        desc: "Just teach me something... The readbull is too strong and all hear are the spheres of valhala"
        //solved: false
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
    firebase: new Firebase('https://learnstream-fuu.firebaseio.com/')
  });

  $(function() {
    window.QuestionView = Backbone.View.extend({
    template: Handlebars.compile($('#question-item').html().trim()),
    events: {


    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'remove', this.remove);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }


  });
});




}).call(this);







