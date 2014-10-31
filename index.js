var request = require('request')
var colors = require('colors')

exports.topics = [
  {
    name: 'apps',
    commands: [
      {
        name: 'status',
        signature: 'apps:status',
        shortHelp: 'get status of a production app',
        needsApp: true,
        needsAuth: true,
        help: "\
Get the status of a production app.\n\
\n\
Examples:\n\
  $ heroku heroku-production-check\n\
  Status: green",

        // Called with heroku heroku-production-check
        //   context: The Heroku context object which would be something like this:
        //            {
        //              "app": "shielded-chamber-4849",
        //              "auth": { "user": "username", "password": "theapitoken"},
        //              "args": {} // arguments passed
        //            }
        run: function (context) {
          request({
            uri: 'https://production-check-api.herokuapp.com/production-checks/'+context.app,
            auth: {user: "", password: context.auth.password},
            json: true
          }, function (err, _, checks) {
            if (err) { throw err }
            if (checks.message) { return console.error(checks.message) }
            Object.keys(checks).forEach(function (key) {
              printStatusCheck(checks[key])
            })
          })
        }
      }
    ]
  }
]

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
  console.log('  %s\n', check.devCenterURL.underline)

  if (check.message) {
    console.log(color('  ' + check.message))
  }
  console.log()
}
