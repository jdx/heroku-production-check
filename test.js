var netrc = require('netrc')()
var plugin = require('./index')

plugin.topics[0].commands[0].run([], {}, {
  app: 'dickey-xxx',
  token: netrc['api.heroku.com']['password']
})
