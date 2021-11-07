require('@babel/register')({
  presets: [ '@babel/env' ]
})

module.exports = require('../iroha/GetInfo.tsx')