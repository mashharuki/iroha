require('@babel/register')({
  presets: [ '@babel/env' ]
})

module.exports = require('../iroha/iroha12.js')