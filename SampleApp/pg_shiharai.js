//チャージ＆支払情報登録
let ACCOUNT_ID = process.argv[2]        // アカウントID
let PREPAY     = process.argv[3]        // prepay
let TICKET     = process.argv[4]        // ticket
let TOTAL      = process.argv[5]        // total
let SHISETSU   = process.argv[6]        // 施設
let NINZU      = process.argv[7]        // 人数
let USETIME    = process.argv[8]        // 利用時間
let JOB        = process.argv[9]        // 処理内容(charge/shiharai)

//PostgreSQL接続で使用
const { Client } = require('pg')

//PostgreSQL接続情報
const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'reidai',
    password: 'mysecretpassword',
    port: 5432,
})

//PostgreSQLへ接続
client.connect()

//INSERTクエリーの定義
const sql = 'INSERT INTO shiharai_info (id,prepay,ticket,total,shisetsu,ninzu,usetime,job) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'

//INSERTクエリーのパラメータ
const values = [ ACCOUNT_ID, PREPAY, TICKET, TOTAL, SHISETSU, NINZU, USETIME, JOB ]

//INSERTクエリーの実行
client.query(sql, values)
    .then(res => {
        console.log(res)
        client.end()
    })
    .catch(e => console.error(e.stack))
