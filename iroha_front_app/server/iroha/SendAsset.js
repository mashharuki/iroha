/**
 * 支払い処理をHyperleder Iroha上で実施するためのロジックファイル
 */

import grpc from 'grpc';
import { QueryService_v1Client, CommandService_v1Client } from 'iroha-helpers/lib/proto/endpoint_grpc_pb';
import queries from 'iroha-helpers/lib/queries/index';
import commands from 'iroha-helpers/lib/commands/index';

let util = require('util');
// コマンドの引数から取得する。
let total = process.argv[2];
let domain = process.argv[3];
let accountId = process.argv[4];
let privateKey = process.argv[5];
let msg = process.argv[6];
// アセット転送先アカウント
let tAccountId = process.argv[7];

// 設定ファイルの読み込み
const ConfigFile = require('config');
// Hyperleder Iroha用のアドレス情報
const IROHA_ADDRESS = ConfigFile.config.iroha_node + ':51051';
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
    queryService,
    timeoutLimit: 7000
    },(block) => {
        console.log('fetchCommits new block:', util.inspect(block,false,null))
    },(error) => console.error('fetchCommits failed:', error.stack));

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
        assetId: 'total#' + domain,
        description: msg,
        amount: total
      }),
])
.then(a => console.log(a))
.catch(e => console.error(e))