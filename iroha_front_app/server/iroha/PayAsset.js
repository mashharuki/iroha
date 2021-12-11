/**
 * 支払い処理をHyperleder Iroha上で実施するためのロジックファイル
 */

import grpc from 'grpc';
import { QueryService_v1Client, CommandService_v1Client } from 'iroha-helpers/lib/proto/endpoint_grpc_pb';
import queries from 'iroha-helpers/lib/queries/index';
import commands from 'iroha-helpers/lib/commands/index';

let util = require('util');
// コマンドの引数から取得する。
let prepay = process.argv[2];
let counter = process.argv[3];
let total = process.argv[4];
let domain = process.argv[5];
let accountId = process.argv[6];
let privateKey = process.argv[7];
let msg = process.argv[8];
// アセット転送先アカウント
const tAccountId = "user@nihon";

// Hyperleder Iroha用のアドレス情報
const IROHA_ADDRESS = 'localhost:51051';
// adminのアカウントと秘密鍵情報(開発用)
const adminId = 'admin@test';
const adminPriv = 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70';
// コマンドを利用するためのインスタンスを生成
const commandService = new CommandService_v1Client(IROHA_ADDRESS, grpc.credentials.createInsecure());
// クエリを利用するためのインスタンスを生成
const queryService = new QueryService_v1Client(IROHA_ADDRESS, grpc.credentials.createInsecure());

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

// アセットの転送処理
Promise.all([
    commands.transferAsset({
      privateKeys: [privateKey],
      creatorAccountId: accountId,
      quorum: 1,
      commandService,
      timeoutLimit: 5000
    }, {
      srcAccountId: accountId,
      destAccountId: tAccountId,
      assetId: 'prepay#' + domain ,
      description: msg ,
      amount: prepay
    }),
    commands.transferAsset({
      privateKeys: [privateKey],
      creatorAccountId: accountId,
      quorum: 1,
      commandService,
      timeoutLimit: 5000
    }, {
      srcAccountId: accountId,
      destAccountId: tAccountId,
      assetId: 'ticket#' + domain ,
      description: msg ,
      amount: counter
    }),
    commands.addAssetQuantity({
      privateKeys: [privateKey],
      creatorAccountId: accountId,
      quorum: 1,
      commandService,
      timeoutLimit: 5000
    }, {
      assetId: 'total#' + domain ,
      amount: total
    })
])
.then(a => console.log(a))
.catch(e => console.error(e))