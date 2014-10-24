var request = require('request')

// Plugin calls take the form:
// heroku topic:command [args/flags]
// Where topic is the name of the npm package

exports.shortHelp = "get status of a production app"

// Called with heroku help heroku-production-check
//   command: Command entered
//            e.g. heroku help heroku-production-check:foobar, command is "foobar"
exports.help = function (command) {
  console.log("Get the status of a production app. Shows information about stuff.\n")
  console.log("Examples:\n")
  console.log("  $ heroku heroku-production-check")
  console.log("  Status: green")
}

// Called with heroku heroku-production-check
//   command: Command entered
//            e.g. heroku heroku-production-check:foobar, command is "foobar"
//      args: All arguments after heroku topic:command
//     flags: Any flags passed by the CLI
//   context: The Heroku context object which would be something like this:
//            {
//              "app": "shielded-chamber-4849",
//              "token": "theapitoken",
//            }
exports.run = function (command, args, flags, context) {
  console.log('running')
  request({
    uri: 'https://production-check-api.herokuapp.com/production-checks/'+context.app,
    headers: {
      Authorization: "Basic " + context.token
    },
    json: true
  }, function (err, check) {
    if (err) { throw err }
    console.log("TODO: print pretty output of production check")
    console.log(check)
  })
}

