/**
 * キーペア作成コンポーネント
 * @param アカウントID
 * @param ドメイン
 * @returns 生成したアカウントの公開鍵
 */

const Keycreate = function (account, domain) {
    // fsモジュールをインスタンス化
    const fs = require('fs');
    // 公開鍵を格納(初期化)
    let public_key = ''            
    // 秘密鍵を格納(初期化)
    let private_key = '' 
    // 設定ファイルの読み込み
    const ConfigFile = require('config');                  
    // キーペアのディレクトリ
    const KEY_DIR = ConfigFile.config.dev_key_dir;

    // ed25519オブジェクト作成
    let ed25519 = require('ed25519.js')      
    // キーペア作成
    let keys = ed25519.createKeyPair()        
    // public key セット
    let pub = keys.publicKey                  
    // private key セット
    let priv = keys.privateKey                

    for (var i = 0; i < 32; i++) {            // 配列を文字列に変換
        public_key = public_key + pub[i].toString(16).padStart(2, '0')
    }

    for (var i = 0; i < 32; i++) {            // 配列を文字列に変換
        private_key = private_key + priv[i].toString(16).padStart(2, '0')
    }

    // console.log('public Key :', public_key)   
    // console.log('private Key:', private_key)  

    //公開鍵をファイルに書き出し
    fs.writeFile(KEY_DIR + account + '@' + domain + '.pub', public_key , function (err) {
        if (err) {
            throw err
        }
    })

    //秘密鍵をファイルに書き出し
    fs.writeFile(KEY_DIR + account + '@' + domain + '.priv', private_key , function (err) {
        if (err) {
            throw err
        }
    })
    return public_key;
};
 
module.exports = { Keycreate };