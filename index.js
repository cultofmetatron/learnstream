var path = require('path');
var configs = require('./configuration.js');
configs['rootDir'] = path.join(__dirname, '.');
app = require('./server/index.js')(configs);

app.listen(app.get('port'), function() {
  console.log('hackstack listening on ' + app.get('port'));

});
