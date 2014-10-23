var request = require('request')

exports.run = function (command, args, flags, context) {
  console.log('running')
  request({
    uri: 'https://production-check-api.herokuapp.com/production-checks/'+context.app,
    auth: ':' + context.token,
    json: true
  }, function (err, check) {
    console.log(err)
    console.log(check)
  })
}

exports.help = function (command, context) {
  console.log('help')
}
