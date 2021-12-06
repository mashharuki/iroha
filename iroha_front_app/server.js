/**
 * Hyperledger Iroha用のサーバー設定ファイル
 */

import grpc from 'grpc';
import {
    QueryService_v1Client as QueryService,
    CommandService_v1Client as CommandService
} from 'iroha-helpers/lib/proto/endpoint_grpc_pb';
import queries from 'iroha-helpers-ts/lib/queries';
import commands from 'iroha-helpers-ts/lib/commands';

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
// Hyperleder Iroha用のアドレス情報
const IROHA_ADDRESS = 'localhost:50051'
// adminのアカウントと秘密鍵情報(開発用)
const adminId = 'admin@test'
const adminPriv = 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'
// コマンドを利用するためのインスタンスを生成
const commandService = new CommandService(IROHA_ADDRESS, grpc.credentials.createInsecure());
// クエリを利用するためのインスタンスを生成
const queryService = new QueryService(IROHA_ADDRESS, grpc.credentials.createInsecure());

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
    // 公開鍵を取得する。
    let publicKey = Keycreate.Keycreate();
    // ブロック用の変数
    let block = 0;
    // 生成したブロック情報を取得する設定
    queries.fetchCommits({
        privateKey: adminPriv,
        creatorAccountId: adminId,
        queryService,
        timeoutLimit: 7000
    },
    (bk) => {
        console.log('fetchCommits new block:', bk)
        // ブロック高の情報が存在する場合は、ブロック高の値をセットする。
        if (bk.match(/height: (\d+),/) !== null){
            // ステート変数に値を詰める。
            block = bk.match(/height: (\d+),/)[1];
        }
    },
    (error) => console.error('fetchCommits failed:', error.stack))

    // アカウント作成処理
    Promise.all([
        // createAccountコマンドを呼び出す。
        commands.createAccount({
            privateKeys: [adminPriv],
            creatorAccountId: adminId,
            quorum: 1,
            commandService,
            timeoutLimit: 5000
        },{
            accountName: accountId,
            domainId: domain,
            publicKey: publicKey
        })
    ])
    .then(a => {
        console.log("アカウント作成成功：", a);
    })
    .catch(e => console.error("アカウント作成失敗：", e));

    // 実行するSQL
    const query = 'INSERT INTO kaiin_info (id,name,kana,addr,tel,bd,ed,block) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
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