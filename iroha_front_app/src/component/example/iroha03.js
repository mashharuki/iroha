require('@babel/register')({
  presets: [ '@babel/env' ]
})

module.exports = require('../iroha/iroha13.js')
