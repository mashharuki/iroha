/**
 * アカウント情報＆アセット残高するコンポーネント
 */

// for usage with grpc package use endpoint_grpc_pb file
import grpc from 'grpc'

function GetInfo():void {
  // アカウントID
  let ACCOUNT_ID:string  = process.argv[2]    
  const IROHA_ADDRESS:string = 'localhost:50051'
  const { QueryService_v1Client } = require('iroha-helpers/lib/proto/endpoint_grpc_pb')
  const { queries } = require('iroha-helpers/lib/queries')

  // getAccount と getAccountAssets で使用
  const adminId:string = 'admin@test'
  const adminPriv:string = 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

  const queryService = new QueryService_v1Client(
    IROHA_ADDRESS,
    grpc.credentials.createInsecure()
  )

  Promise.all([
    queries.getAccount({
      privateKey: adminPriv,
      creatorAccountId: adminId,
      queryService,
      timeoutLimit: 5000
    }, {
      accountId: ACCOUNT_ID
    }),
    queries.getAccountAssets({
      privateKey: adminPriv,
      creatorAccountId: adminId,
      queryService,
      timeoutLimit: 5000
    }, {
      accountId: ACCOUNT_ID
    })
  ])
    .then(a => console.log(a))
    .catch(e => console.error(e))
}

export default GetInfo