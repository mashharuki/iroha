// ED25519キーペア―作成コンポーネント

function Ed25519_keygen():void {
  // 公開鍵を格納
  let public_key: string = ''                     
  // 秘密鍵を格納
  let private_key: string = ''                    

  // ed25519オブジェクト作成
  let ed25519 = require('ed25519.js')     
  // キーペア作成
  let keys = ed25519.createKeyPair()      
  // console.log(keys.publicKey)          
  // console.log(keys.privateKey)         
  let pub = keys.publicKey                
  let priv = keys.privateKey              

  for (var i = 0; i < 32; i++) {          
    // バッファ(配列)を文字列に変換
    public_key = public_key + pub[i].toString(16).padStart(2, '0')
  }

  for (var i = 0; i < 32; i++) {          
    // バッファ(配列)を文字列に変換
    private_key = private_key + priv[i].toString(16).padStart(2, '0')
  }

  // public key をコンソールに出力
  console.log('public Key :',public_key)  
  // private key をコンソールに出力
  console.log('private Key:',private_key) 
}

// モジュールとして外部に公開
export default Ed25519_keygen