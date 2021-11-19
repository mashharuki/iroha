require('@babel/register')({
  presets: [ '@babel/env' ]
})

module.exports = require('../iroha/iroha16.js')
