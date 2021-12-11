/**
 * アセット加算処理を呼び出すためのファイル
 */
 require('@babel/register')({
    presets: [ '@babel/env' ]
  })
  
module.exports = require('../ChargeAsset');