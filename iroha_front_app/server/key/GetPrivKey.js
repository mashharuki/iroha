/**
 * 指定したアカウントに紐づく秘密鍵の情報を取得するロジックファイル
 */

/**
 * GetPrivKeyコンポーネント
 * @param アカウントID
 * @param ドメイン
 * @returns アカウントの秘密鍵
 */
const GetPrivKey = function(accountId, domain) {
    
    // fsモジュールをインスタンス化
    const fs = require('fs');
    // 設定ファイルの読み込み
    const ConfigFile = require('config');                  
    // キーペアのディレクトリ
    const KEY_DIR = ConfigFile.config.dev_key_dir;
    // 秘密鍵用の変数
    let privateKey = '';

    // ファイルから秘密鍵情報を読み取る。
    try {
        privateKey =  fs.readFileSync((KEY_DIR + accountId + '@' + domain + '.priv'), "utf8");
    } catch(e) {
        console.log(e.message);
    }

    return privateKey;
}

module.exports = { GetPrivKey };