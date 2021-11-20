/**
 * DB接続用のモジュール
 */

const pg = function () {
    const { Client } = require('pg')

    const client = new Client({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'iroha_default',
        password: 'mysecretpassword',
        port: 15432,
    })

    client.connect()

    const query = 'SELECT * FROM role'

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
}

module.exports = { pg };