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
    // キーペア格納ディレクトリ
    const KEY_DIR = '/home/haruki/git/iroha/example/' ;
    // 秘密鍵用の変数
    let privateKey = '';

    // ファイルから秘密鍵情報を読み取る。
    try {
        privateKey =  fs.readFileSyncn((KEY_DIR + accountId + '@' + domain + '.priv'), "utf8");
    } catch(e) {
        console.log(e.message);
    }

    return privateKey;
}

module.exports = { GetPrivKey };