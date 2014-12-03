var netrc = require('netrc')();
var plugin = require('./index');

plugin.commands[0].run({
  app: 'dickey-xxx',
  auth: { password: netrc['api.heroku.com'].password }
});
