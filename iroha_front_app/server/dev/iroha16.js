// ブロック表示(アカウント)
let ACCOUNT_ID = process.argv[2]    // アカウントID
let NEXT_HASH  = process.argv[3]    // ネクストページハッシュ値

let util = require('util')          // 戻り値の分解に使用

// for usage with grpc package use endpoint_grpc_pb file
import grpc from 'grpc'
import {
  QueryService_v1Client
} from '../lib/proto/endpoint_grpc_pb'

import queries from '../lib/queries'

const IROHA_ADDRESS = 'localhost:50051'

// getAccountTransactionsで使用
const adminId = 'admin@test'
const adminPriv = 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

const queryService = new QueryService_v1Client(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
)

Promise.all([
  queries.getAccountTransactions({
    privateKey: adminPriv,
    creatorAccountId: adminId,
    queryService,
    timeoutLimit: 5000
  }, {
    accountId: ACCOUNT_ID ,
    pageSize: 1,
    firstTxHash: NEXT_HASH
  })
])
  .then(a => console.log(util.inspect(a,false,null)))
  .catch(e => console.error(e))
