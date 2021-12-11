/**
 * アカウント作成処理用コンポーネントファイル
 */

import grpc2 from 'grpc';
import { QueryService_v1Client, CommandService_v1Client } from 'iroha-helpers/lib/proto/endpoint_grpc_pb';
import queries from 'iroha-helpers/lib/queries/index';
import commands from 'iroha-helpers/lib/commands/index';

let util = require('util');
// コマンドの引数から取得する。
let domain = process.argv[2];
let accountId = process.argv[3];
let publicKey = process.argv[4];

// Hyperleder Iroha用のアドレス情報
const IROHA_ADDRESS = 'localhost:51051';
// adminのアカウントと秘密鍵情報(開発用)
const adminId = 'admin@test';
const adminPriv = 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70';
// コマンドを利用するためのインスタンスを生成
const commandService = new CommandService_v1Client(IROHA_ADDRESS, grpc2.credentials.createInsecure());
// クエリを利用するためのインスタンスを生成
const queryService = new QueryService_v1Client(IROHA_ADDRESS, grpc2.credentials.createInsecure());

// 自動的終了するための処理
setTimeout(() => {
    console.log('AutoEnd!')
    process.exit(0)
  }, 7000);

// 生成したブロック情報を取得する設定
queries.fetchCommits({
    privateKey: adminPriv,
    creatorAccountId: adminId,
    queryService
},
(block) => {
    console.log('fetchCommits new block:', util.inspect(block,false,null))
},
(error) => console.error('fetchCommits failed:', error.stack));

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