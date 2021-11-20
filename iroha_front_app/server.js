/**
 * Hyperledger Iroha用のサーバー設定ファイル
 */

// Webサーバーの起動
const express = require('express');
const app = express();
// ポート番号
const portNo = 3001;
// 起動
app.listen(portNo, () => {
    console.log('起動しました', `http://localhost:${portNo}`)
});
// DB接続用のモジュールを読みこむ
const pgHelper = require('./server/pgHelper');

// APIの定義
/**
 * テスト用のAPI
 */
app.get('/api/test', (req, res) => {
    // SQL文
    const query = req.query.query;
    const values = req.query.values2;
    // DBの実行
    const result = pgHelper.execute(query, values);
    console.log('取得結果：', result);
    // 結果を返却する。
    return result;
});

// 静的ファイルを自動的に返すようルーティングする。
app.use('/input', express.static('./build'));
app.use('/pay', express.static('./build'));
app.use('/charge', express.static('./build'));
app.use('/', express.static('./build'));