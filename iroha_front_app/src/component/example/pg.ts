
function pg () {
    const { Client } = require('pg')

    const client = new Client({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'iroha_default',
        password: 'mysecretpassword',
        port: 5432,
    })

    client.connect()

    const query:string = 'SELECT * FROM role'

    client.query(query)
        .then((res: any) => {
            console.log(res.rows[0])
            client.end()
        })
        .catch((e: any) => console.error(e.stack))
}

export default pg