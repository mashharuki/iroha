// アセット加算処理
let ACCOUNT_ID    = process.argv[2]     // アカウントID
let priv_key      = process.argv[3]     // 秘密鍵
let AMOUNT_PREPAY = process.argv[4]     // アセット加算値(prepay#nihon)
let AMOUNT_TICKET = process.argv[5]     // アセット加算値(ticket#nihon)
let AMOUNT_TOTAL  = process.argv[6]     // アセット加算値(total#nihon)

let util = require('util')              //戻り値(ブロック)の分解に使用

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

// アセット加算処理
Promise.all([
  commands.addAssetQuantity({
    privateKeys: [priv_key],
    creatorAccountId: ACCOUNT_ID,
    quorum: 1,
    commandService,
    timeoutLimit: 5000
  }, {
    assetId: 'prepay#nihon' ,
    amount: AMOUNT_PREPAY
  }),
  commands.addAssetQuantity({
    privateKeys: [priv_key],
    creatorAccountId: ACCOUNT_ID,
    quorum: 1,
    commandService,
    timeoutLimit: 5000
  }, {
    assetId: 'ticket#nihon' ,
    amount: AMOUNT_TICKET
  }),
  commands.addAssetQuantity({
    privateKeys: [priv_key],
    creatorAccountId: ACCOUNT_ID,
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
