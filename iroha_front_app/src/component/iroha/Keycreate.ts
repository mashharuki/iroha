/**
 * キーペア作成コンポーネント
 * @returns 生成したアカウントの公開鍵
 */

import * as fs from 'fs'

function Keycreate (): string {
  // ドメイン名
  let DOMAIN:string  = process.argv[2]   
  // アカウント名
  let ACCOUNT:string = process.argv[3]   

  // 公開鍵を格納(初期化)
  let public_key:string = ''            
  // 秘密鍵を格納(初期化)
  let private_key:string = ''            
          
  // キーペアのディレクトリ
  const KEY_DIR:string = '/home/haruki/git/iroha/example/' 

  // ed25519オブジェクト作成
  let ed25519 = require('ed25519.js')      
  // キーペア作成
  let keys = ed25519.createKeyPair()        
  // public key セット
  let pub:any[] = keys.publicKey                  
  // private key セット
  let priv:any[] = keys.privateKey                

  for (var i = 0; i < 32; i++) {            // 配列を文字列に変換
    public_key = public_key + pub[i].toString(16).padStart(2, '0')
  }

  for (var i = 0; i < 32; i++) {            // 配列を文字列に変換
    private_key = private_key + priv[i].toString(16).padStart(2, '0')
  }

  // console.log('public Key :', public_key)   
  // console.log('private Key:', private_key)  
  
  //公開鍵をファイルに書き出し
  fs.writeFile(KEY_DIR + ACCOUNT + '@' + DOMAIN + '.pub', public_key , function (err:any) {
    if (err) {
      throw err
    }
  })

  //秘密鍵をファイルに書き出し
  fs.writeFile(KEY_DIR + ACCOUNT + '@' + DOMAIN + '.priv', private_key , function (err:any) {
    if (err) {
      throw err
    }
  })
  return public_key;
}

export default Keycreate