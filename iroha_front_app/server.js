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
// 外部プロセス呼び出し用に使用する。
let exec = require('child_process').exec 
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
    publicKey = Keycreate.Keycreate();
    res.json({ publicKey: publicKey });
 });

/**
 * 新規会員情報を挿入するためのAPI
 */
app.get('/api/input', (req, res) => {
    // パラメータから値を取得する。
    let domain = req.query.domain;
    let accountId = req.query.accountId;
    let name = req.query.name;
    let kana = req.query.kana;
    let tel = req.query.tel;
    let addr = req.query.adds;
    let bd = req.query.bd;
    let ed = req.query.ed;
    // ブロック高用の変数を用意する。
    let block = 0;
    // 公開鍵を取得する。
    let publicKey = Keycreate.Keycreate();

    // アカウント作成用のコマンドを作成
    let COMMAND = ['node ./server/CreateAccountCall.js', domain, accountId, publicKey];
    COMMAND = COMMAND.join(' ');
    console.log('Execute COMMAND=', COMMAND);

    // コマンドを実行する。
    exec( COMMAND , function(error, stdout, stderr) {
        if (error !== null) {                
            console.log('exec error: ' + error)
            return
        }
        console.log(stdout)
        //ブロック位置を取得
        if (stdout.match(/height: (\d+),/) !== null){
            block = stdout.match(/height: (\d+),/)[1];
            console.log("block:", block);
        } else {
            //キーファイルより公開鍵を取得
            block = (2^64)+1
        }
    });
    // 実行するSQL
    const query = 'INSERT INTO kaiin_info (id,name,kana,addr,tel,bd,ed,block) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
    // パラメータ用の配列を作成する。
    const values = [ accountId + '@' + domain, name, kana, addr, tel, bd, ed, block ];
    // DBの実行
    pgHelper.execute(query, values, (err, docs) => {
        if (err) {
            console.log(err.toString());
            return;
        }
        console.log('実行結果：', docs);
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