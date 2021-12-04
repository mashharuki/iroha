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
// 鍵生成用のモジュールを読み込む
const Keycreate = require('./server/KeyCreate');

// APIの定義

/**
 * テスト用API
 */
 app.get('/api/test', (req, res) => {
    // SQL文
    const query = req.query.query;
    const values = req.query.values;
    // DBの実行
    pgHelper.execute(query, values, (err, docs) => {
        if (err) {
            console.log(err.toString());
            return;
        }
        console.log('取得結果：', docs.rows);
        res.json({ roles: docs.rows });
    });
});

/**
 * キーペアを生成し、公開鍵を取得するためのAPI
 */
 app.get('/api/publickey', (req, res) => {
    // 公開鍵用の変数
    let publicKey ='';
    // 公開鍵を取得する。
    publicKey = Keycreate();
    console.log("publicKey:", publicKey);
    res.json({ publicKey: publicKey });
 });

/**
 * 新規会員情報を挿入するためのAPI
 */
app.get('/api/input', (req, res) => {
    // 実行するSQL
    const query = 'INSERT INTO kaiin_info (id,name,kana,addr,tel,bd,ed,block) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
    // パラメータ
    const values = req.query.values;
    // DBの実行
    pgHelper.execute(query, values, (err, docs) => {
        if (err) {
            console.log(err.toString());
            return;
        }
        console.log('取得結果：', docs);
        // res.json({ roles: docs.rows });
    });
});

/**
 * チャージ処理用API
 */
app.get('/api/charge', (req, res) => {
    // SQL文
    const query = req.query.query;
    const values = req.query.values;
    // DBの実行
    pgHelper.execute(query, values, (err, docs) => {
        if (err) {
            console.log(err.toString());
            return;
        }
        console.log('取得結果：', docs.rows);
        res.json({ roles: docs.rows });
    });
});

/**
 * 支払処理用API
 */
app.get('/api/pay', (req, res) => {
    // SQL文
    const query = req.query.query;
    const values = req.query.values;
    // DBの実行
    pgHelper.execute(query, values, (err, docs) => {
        if (err) {
            console.log(err.toString());
            return;
        }
        console.log('取得結果：', docs.rows);
        res.json({ roles: docs.rows });
    });
});

// 静的ファイルを自動的に返すようルーティングする。
app.use('/input', express.static('./build'));
app.use('/pay', express.static('./build'));
app.use('/charge', express.static('./build'));
app.use('/', express.static('./build'));