/**
 * DB接続用のモジュール
 */

const execute = function (database, query, values, callback) {
    const { Client } = require('pg');
    // DB接続用の初期設定
    const client = new Client({
        user: 'postgres',
        host: '127.0.0.1',
        database: database,
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
                callback(null, res)
            })
            .catch((e) => {
                callback(e.stack, null);
            }).finally( () => {
                client.end();
            });
    } else {
        client.query(query, values)
            .then((res) => {
                callback(null, res)
            })
            .catch((e) => {          
                callback(e.stack, null);
            }).finally( () => {
                client.end();
            });
    }
}

module.exports = { execute };