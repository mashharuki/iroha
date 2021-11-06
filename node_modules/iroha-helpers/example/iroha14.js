// アセット転送処理
let F_ACCOUNT_ID  = process.argv[2]     // 転送元アカウントID
let priv_key      = process.argv[3]     // 秘密鍵
let AMOUNT_PREPAY = process.argv[4]     // アセット転送値(prepay#nihon)
let AMOUNT_TICKET = process.argv[5]     // アセット転送値(ticket#nihon)
let AMOUNT_TOTAL  = process.argv[6]     // アセット加算値(total#nihon)
let MSG           = process.argv[7]     // メッセージ
const T_ACCOUNT_ID = 'user@nihon'       // 転送先アカウントID

let util = require('util')              // 戻り値(ブロック)の分解に使用

// for usage with grpc package use endpoint_grpc_pb file
import grpc from 'grpc'
import {
  QueryService_v1Client,
  CommandService_v1Client
} from '../lib/proto/endpoint_grpc_pb'

import commands from '../lib/commands'
import queries from '../lib/queries'

const IROHA_ADDRESS = 'localhost:50051'

// fetchCommitsで使用
const adminId = 'admin@test'
const adminPriv = 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

const commandService = new CommandService_v1Client(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
)

const queryService = new QueryService_v1Client(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
)

// 自動的終了するための処理
setTimeout(() => {
    console.log('AutoEnd!')
    process.exit(0)
  }, 7000)

// 完了したブロックを採取
queries.fetchCommits({
    privateKey: adminPriv,
    creatorAccountId: adminId,
    queryService
  },
  (block) => console.log('fetchCommits new block:', util.inspect(block,false,null)),
  (error) => console.error('fetchCommits failed:', error.stack)
)

// アセットの転送処理
Promise.all([
  commands.transferAsset({
    privateKeys: [priv_key],
    creatorAccountId: F_ACCOUNT_ID,
    quorum: 1,
    commandService,
    timeoutLimit: 5000
  }, {
    srcAccountId: F_ACCOUNT_ID,
    destAccountId: T_ACCOUNT_ID,
    assetId: 'prepay#nihon' ,
    description: MSG ,
    amount: AMOUNT_PREPAY
  }),
  commands.transferAsset({
    privateKeys: [priv_key],
    creatorAccountId: F_ACCOUNT_ID,
    quorum: 1,
    commandService,
    timeoutLimit: 5000
  }, {
    srcAccountId: F_ACCOUNT_ID,
    destAccountId: T_ACCOUNT_ID,
    assetId: 'ticket#nihon' ,
    description: MSG ,
    amount: AMOUNT_TICKET
  }),
  commands.addAssetQuantity({
    privateKeys: [priv_key],
    creatorAccountId: F_ACCOUNT_ID,
    quorum: 1,
    commandService,
    timeoutLimit: 5000
  }, {
    assetId: 'total#nihon' ,
    amount: AMOUNT_TOTAL
  })
])
  .then(a => console.log(a))
  .catch(e => console.error(e))
