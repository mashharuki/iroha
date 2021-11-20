/**
 * DB接続用のモジュール
 */

const execute = function (query, values, callback) {
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
    if (typeof values === "undefined") {
        client.query(query)
            .then((res) => {
                client.end();
                callback(null, res)
            })
            .catch((e) => {
                return callback(e.stack, null);
            });
    } else {
        client.query(query, values)
            .then((res) => {
                client.end();
                callback(null, res)
            })
            .catch((e) => {
                return callback(e.stack, null);
            });
    }
}

module.exports = { execute };