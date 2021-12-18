/**
 * Hyperledger Iroha用のAPIサーバー設定ファイル
 */

// Webサーバーの起動
const express = require('express');
const app = express();
// ポート番号
const portNo = 3001;
// 接続するデータベース名
const database1 = 'reidai';
const database2 = 'iroha_default';
// 起動
app.listen(portNo, () => {
    console.log('起動しました', `http://localhost:${portNo}`)
});
// 外部プロセス呼び出し用に使用する。
let exec = require('child_process').exec;
// 暗号化用のモジュールを読み込む
const crypto = require('crypto');
// DB接続用のモジュールを読みこむ
const pgHelper = require('./server/db/pgHelper');
// 鍵生成用のモジュールを読み込む
const Keycreate = require('./server/key/KeyCreate');
// 鍵取得用のモジュールを読み込む
const GetPrivKey = require('./server/key/GetPrivKey');

// APIの定義

/**
 * テスト用API
 */
 app.get('/api/test', (req, res) => {
    // SQL文
    const query = req.query.query;
    const values = req.query.values;
    // DBの実行
    pgHelper.execute(database1, query, values, (err, docs) => {
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
    let password = req.query.password;
    // パスワードのハッシュ値を取得する。
    let passHash = crypto.createHash('sha256').update(password).digest('hex');
    // ブロック高用の変数を用意する。
    let block = 0;
    // 公開鍵を取得する。
    let publicKey = Keycreate.Keycreate(accountId, domain);

    // アカウント作成用のコマンドを作成
    let COMMAND = ['node ./server/iroha/call/CreateAccountCall.js', domain, accountId, publicKey];
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
        // 実行するSQL
        const query = 'INSERT INTO kaiin_info (id,name,kana,addr,tel,bd,ed,block,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)';
        // パラメータ用の配列を作成する。
        const values = [ accountId + '@' + domain, name, kana, addr, tel, bd, ed, block, passHash ];
        // DBの実行
        pgHelper.execute(database1, query, values, (err, docs) => {
            if (err) {
                console.log(err.toString());
                return;
            }
            console.log('実行結果：', docs);
            // res.json({ roles: docs.rows });
        });
    });
});

/**
 * チャージ処理用API
 */
app.get('/api/charge', (req, res) => {
    // パラメータから値を取得する。
    const prepay = req.query.prepay;
    const counter = req.query.counter;
    const total = req.query.total;
    const accountId = req.query.accountId;
    const domain = req.query.domain;
    // メッセージ
    const msg = "charge";
    // アカウントの秘密鍵を取得する。
    const privateKey = GetPrivKey.GetPrivKey(accountId, domain);
    // アカウント作成用のコマンドを作成
    let COMMAND = ['node ./server/iroha/call/ChargeAssetCall.js', prepay, counter, total, domain, accountId + '@' + domain, privateKey];
    COMMAND = COMMAND.join(' ');
    console.log('Execute COMMAND=', COMMAND);

    // ブロック高用の変数
    let block = 0;
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

        // 実行するSQL
        const query = 'INSERT INTO shiharai_info (id,prepay,ticket,total,shisetsu,ninzu,usetime,job) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
        // パラメータ用の配列を作成する。
        const values = [ accountId + '@' + domain, prepay, counter, total, '-', 0, 0, msg ];
        // DBの実行
        pgHelper.execute(database1, query, values, (err, docs) => {
            if (err) {
                console.log(err.toString());
                return;
            }
            console.log('実行結果：', docs);
            // res.json({ roles: docs.rows });
        });
    });
});

/**
 * 支払処理用API
 */
app.get('/api/pay', (req, res) => {
    // パラメータから値を取得する。
    const prepay = req.query.prepay;
    const counter = req.query.counter;
    const total = req.query.total;
    const accountId = req.query.accountId;
    const domain = req.query.domain;
    const room = req.query.room;
    const people = req.query.people;
    const usetime = req.query.usetime;
    // メッセージ
    const msg = "pay";
    // アカウントの秘密鍵を取得する。
    const privateKey = GetPrivKey.GetPrivKey(accountId, domain);

    // アセット送金用のコマンドを作成
    let COMMAND = ['node ./server/iroha/call/PayAssetCall.js', prepay, counter, total, domain, accountId + '@' + domain, privateKey, msg];
    COMMAND = COMMAND.join(' ');
    console.log('Execute COMMAND=', COMMAND);

    // ブロック高用の変数
    let block = 0;
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

        // 実行するSQL
        const query = 'INSERT INTO shiharai_info (id,prepay,ticket,total,shisetsu,ninzu,usetime,job) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
        // パラメータ用の配列を作成する。
        const values = [ accountId + '@' + domain, prepay, counter, total, room, people, usetime, msg ];
        // DBの実行
        pgHelper.execute(database1, query, values, (err, docs) => {
            if (err) {
                console.log(err.toString());
                return;
            }
            console.log('実行結果：', docs);
            // res.json({ roles: docs.rows });
        });
    });
});

/**
 * 取引履歴照会用API
 */
app.get('/api/getTxHistory', (req, res) => {
    // パラメータから値を取得する。
    const accountId = req.query.accountId;
    const domain = req.query.domain;
    // 実行するSQL
    const query = 'select no, id, prepay, ticket, total, shisetsu, ninzu, usetime, job from shiharai_info where id = $1';
    // パラメータ用の配列を作成する。
    const values = [ accountId + '@' + domain ];
    // DBの実行
    pgHelper.execute(database1, query, values, (err, docs) => {
        if (err) {
            console.log(err.toString());
            return;
        }
        console.log('実行結果：', docs.rows);
        res.status(200).send(docs.rows);
    });
});

/**
 * IDとパスワードを値を検証するAPI
 */
app.post('/api/login', (req, res) => {
    // パラメータから値を取得する。
    const accountId = req.query.accountId;
    const domain = req.query.domain;
    const password = req.query.password;
    // パスワードのハッシュ値を取得する。
    const passHash = crypto.createHash('sha256').update(password).digest('hex');
    // 実行するSQL
    const query = 'select * from kaiin_info where id = $1 and password = $2';
    // パラメータ用の配列を作成する。
    const values = [ accountId + '@' + domain, passHash ];
    // DBの実行
    pgHelper.execute(database1, query, values, (err, docs) => {
        if (err) {
            console.log(err.toString());
            return;
        }
        console.log('実行結果：', docs.rows);
        res.status(200).send(docs.rows);
    });
});

// 静的ファイルを自動的に返すようルーティングする。
app.use('/input', express.static('./build'));
app.use('/pay', express.static('./build'));
app.use('/charge', express.static('./build'));
app.use('/login', express.static('./build'));
app.use('/txHistory', express.static('./build'));
app.use('/', express.static('./build'));