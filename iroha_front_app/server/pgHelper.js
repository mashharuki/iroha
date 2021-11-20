/**
 * DB接続用のモジュール
 */

const execute = async function (query, values) {
    const { Client } = require('pg');
    // DB接続用の初期設定
    const client = new Client({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'iroha_default',
        password: 'mysecretpassword',
        port: 15432,
    });
    
    client.connect();

    console.log('SQL文：', query);
    console.log('パラメータの中身：', values);

    // パラメータの変数の有無で処理を分岐する。
    if (values.length == 0) {
        client.query(query)
            .then((res) => {
                console.log(res.rows[0]);
                client.end();
                return res;
            })
            .catch((e) => {
                console.error(e.stack);
                return e;
            });
    } else {
        client.query(query, values)
            .then((res) => {
                console.log(res.rows[0]);
                client.end();
                return res;
            })
            .catch((e) => {
                console.error(e.stack);
                return e;
            });
    }
}

module.exports = { execute };