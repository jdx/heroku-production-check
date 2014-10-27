var request = require('request')
var colors = require('colors')

exports.commands = {
  apps: {
    status: {
      shortHelp: 'get status of a production app',
      help: "\
Get the status of a production app.\n\
\n\
Examples:\n\
  $ heroku heroku-production-check\n\
  Status: green",

      // Called with heroku heroku-production-check
      //      args: All arguments after heroku topic:command
      //     flags: Any flags passed by the CLI
      //   context: The Heroku context object which would be something like this:
      //            {
      //              "app": "shielded-chamber-4849",
      //              "token": "theapitoken",
      //            }
      run: function (args, flags, context) {
        request({
          uri: 'https://production-check-api.herokuapp.com/production-checks/'+context.app,
          auth: {user: '', password: context.token},
          json: true
        }, function (err, _, checks) {
          if (err) { throw err }
          Object.keys(checks).forEach(function (key) {
            printStatusCheck(checks[key])
          })
        })
      }
    }
  }
}

function printStatusCheck(check) {
  var color = colors.white
  switch (check.status) {
    case 'passed':
      color = colors.green
      icon = '✓'
      break
    case 'failed':
      color = colors.red
      icon = '✗'
      break
    case 'warning':
      color = colors.yellow
      icon = '⚠'
      break
    case 'skipped':
      color = colors.gray
      icon = '…'
      break
  }
  console.log('%s %s', check.title.yellow, color(icon))
  console.log('  %s\n', check.devCenterURL)

  if (check.message) {
    console.log(color('  ' + check.message))
  }
  console.log()
}
