require('@babel/register')({
  presets: [ '@babel/env' ]
})

module.exports = require('../iroha/iroha14.js')
