var netrc = require('netrc')()
var plugin = require('./index')

plugin.topics[0].commands[0].run({
  app: 'dickey-xxx',
  auth: {
    password: netrc['api.heroku.com']['password']
  }
})
