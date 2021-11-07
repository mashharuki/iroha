require('@babel/register')({
  presets: [ '@babel/env' ]
})

module.exports = require('../iroha/iroha15.js')
