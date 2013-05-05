// Resolves CORS bullshit
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

var isLoggedIn = function(req, res, next) {
  if (req.session.accessToken) {
    next();
  } else {
    res.redirect('/');
  }
};

var initOpenTok = function(req, res, next) {
  if (req.session.accessToken) {
    //initialize OpenTok object
  }
  next();
};

module.exports = {};
module.exports.allowCrossDomain = allowCrossDomain;
module.exports.isLoggedIn = isLoggedIn;
