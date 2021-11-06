//会員情報登録
let ACCOUNT_ID = process.argv[2]        //アカウントID
let NAME       = process.argv[3]        //名前
let KANA       = process.argv[4]        //よみ
let ADDS       = process.argv[5]        //住所
let TEL        = process.argv[6]        //電話番号
let BD         = process.argv[7]        //誕生日
let BLOCK      = process.argv[8]        //ブロック位置
let ED                                  //期限

let dt = new Date()                     //現在日付
const year = dt.getFullYear() + 3       //3年後
const month = dt.getMonth() + 1         //当月
const date = dt.getDate()               //当日
ED = year + '/' + month + '/' + date    //期限をセット

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
const sql = 'INSERT INTO kaiin_info (id,name,kana,addr,tel,bd,ed,block) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'

//INSERTクエリーのパラメータ
const values = [ACCOUNT_ID, NAME, KANA, ADDS, TEL, BD, ED, BLOCK]

//INSERTクエリーの実行
client.query(sql, values)
    .then(res => {
        console.log(res)
        client.end()
    })
    .catch(e => console.error(e.stack))
