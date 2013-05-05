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
    firebase: new Firebase('https://learnstream-fuu.firebaseio.com/questions')
  });

  $(document).ready(function() {
    window.QuestionView = Backbone.View.extend({
    tagName: 'li',
    template: Handlebars.compile($('#question-item').html().trim()),
    events: {
      },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'remove', this.remove);
      },
    render: function() {
      this.$el.attr('id', this.model.id);
      return this.$el.html(this.template(this.model.toJSON()));
      }
    });

    window.QuestionsView = Backbone.View.extend({
      tagName: 'ul',
      collection: Questions,
      render: function() {
        var html = [];
        $(this.collection.each(function(question) {
          var questionView = new QuestionView({
            model: question
          });
          questionView.render();
          html.push(questionView.el);
        }));
        this.$el.html(html);
      }
    });


   var questions = new Questions();
    window.questionsView = new QuestionsView({collection: questions });
    questionsView.render();

    var reloadTasks = function() {
      //questions.fetch();
      questions.fetch();
      questionsView.render();
      console.log( $('#question-list'));
      $('#question-list').append(questionsView.el);
      setInterval(reloadTasks, 5000);
    };
    reloadTasks();



  });






}).call(this);

