var netrc = require('netrc')()
var plugin = require('./index')

plugin.commands.apps.status.run([], {}, {
  app: 'dickey-xxx',
  token: netrc['api.heroku.com']['password']
})
