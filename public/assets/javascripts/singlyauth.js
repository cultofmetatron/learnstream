
window.apiBaseUrl = 'https://api.singly.com';

(function() {
  var singly = {
    get: function(url, options, callback) {
      if (!options) {
        options = {};
      }
      options.access_token = accessToken;
    $.getJSON(apiBaseUrl + url, options, callback);
    }
  };

  //run on page load
  $(function() {
    $('#access-token').val(accessToken);
    $('#access-token-wrapper').show();

    //get User's profile
    singly.get('/profiles', null, function(profiles) {
     _.each(Object.keys(profiles), function(profile) {
      if (profile != 'id') {
        $('#profiles').append('<li>' + profile + '</li>');
      }
     });

    });

  });





}).call(this);



