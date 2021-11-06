// コワーキングスペース日本 Webサーバ処理(*実行時にsudoが必要)

let http = require('http')  // httpモジュールを読込
let url = require('url')    // urlモジュールを読込
let fs = require('fs')      // ファイルモジュールを読込

let uri         // urlのpathをセット
let body        // httpのbodyをセット

let err_sysmsg  // irohaエラーメッセージをセット
let err_aplmsg  // アプリエラーメッセージをセット
let accountid   // FORMタグのアカウント名をセット
let name        // FORMタグの名前をセット
let kana        // FORMタグのかなをセット
let adds        // FORMタグの住所をセット
let tel         // FORMタグの電話をセット
let bd          // FORMタグの誕生日をセット
let block       // ブロック位置を格納

let prepay      // prepay#nihonアセット残高をセット, FORMタグのチャージをセット
let ticket      // ticket#nihonアセット残高をセット, FORMタグの回数券をセット
let total       // FORMタグのお支払現金をセット(total#nihonアセット)
let shisetsu    // FORMタグの施設をセット
let ninzu       // FORMタグの人数をセット
let usetime     // FORMタグの利用時間をセット

let pub_key     // キーペアの公開鍵をセット
let priv_key    // キーペアの秘密鍵をセット

let COMMAND     // 外部プロセスのコマンドをセット
let COMMAND2    // 外部プロセスのコマンドをセット
let FileName    // ファイル名をセット
const KEY_DIR = '/home/a1/iroha/example/' // キーペアのディレクトリ(実行環境に依存)

let server = http.createServer()          // httpサーバを作成

let exec = require('child_process').exec  // 外部プロセス呼び出しに使用

// イベントハンドラ(http.createServerのrequestによりコール)
server.on('request', function (req, res) {
    let Response = {    // Responseオブジェクト中に処理を記述して条件毎に分岐する
        'topmenu': function () {
            let template = fs.readFile('topmenu.html', 'utf-8', function (err, data) {
                res.writeHead(200, {                // HTTPレスポンスヘッダを出力する
                    'content-Type': 'text/html'
                })
                res.write(data)                     // HTTPレスポンスボディを出力する
                res.end()
            });
        },
        'kaiin_input': function () {
            let template = fs.readFile('kaiin_input.html', 'utf-8', function (err, data) {
                res.writeHead(200, {
                    'content-Type': 'text/html'
                })
                res.write(data)
                res.end()
            });
        },
        'nyuukai': function () {
            //irohaへの登録
            COMMAND = ['node iroha02.js', 'nihon', accountid, pub_key]
            COMMAND = COMMAND.join(' ')
            console.log('COMMAND=',COMMAND) 
            exec( COMMAND , function(error, stdout, stderr) {
                if (error !== null) {                //コマンドのエラー処理
                    console.log('exec error: ' + error)
                    return
                }
                console.log(stdout)
                //ブロック位置を取得
                if (stdout.match(/height: (\d+),/) !== null){
                    block = stdout.match(/height: (\d+),/)[1]
                } else {
                //キーファイルより公開鍵を取得
                block = (2^64)+1
                }
                //PostgreSQLへの登録
                COMMAND = ['node pg_nyuukai.js', accountid + '@nihon', name, kana, adds, tel, bd, block]
                COMMAND = COMMAND.join(' ');
                console.log('COMMAND=',COMMAND) 
                exec( COMMAND , function(error, stdout, stderr) {
                    if (error !== null) {
                        console.log('exec error: ' + error)
                        return;
                    }
                    console.log(stdout) 
                })
            })
            let template = fs.readFile('topmenu.html', 'utf-8', function (err, data) {
                res.writeHead(200, {
                    'content-Type': 'text/html'
                })
                res.write(data)
                res.end()
            })
        },
        'zandaka1': function () {
            let template = fs.readFile('zandata1.html', 'utf-8', function (err, data) {
                res.writeHead(200, {
                    'content-Type': 'text/html'
                })
                data = data.replace(777, accountid)
                data = data.replace(888, prepay)
                data = data.replace(999, ticket)
                if (accountid === 'user') {
                    data = data.replace('type="submit"', 'type="submit" disabled')
                }
                res.write(data)
                res.end()
           })
        },
        'zandaka2': function () {
            let template = fs.readFile('zandata2.html', 'utf-8', function (err, data) {
                res.writeHead(200, {
                    'content-Type': 'text/html'
                })
                data = data.replace(777, accountid)
                data = data.replace(888, prepay)
                data = data.replace(999, ticket)
                if (accountid === 'user') {
                    data = data.replace('type="submit"', 'type="submit" disabled')
                }
                res.write(data)
                res.end()
          })
        },
        'charge': function () {
            COMMAND = ['node iroha03.js', accountid+'@nihon', priv_key, prepay, ticket, total]
            COMMAND = COMMAND.join(" ")
            console.log('COMMAND=', COMMAND) 
            exec( COMMAND, function(error, stdout, stderr) {
                if (error !== null) {                //コマンドのエラー処理
                    console.log('exec error: ' + error)
                    return
                }
                console.log(stdout)
                //PostgreSQLへの登録
                COMMAND2 = ['node pg_shiharai.js', accountid + '@nihon', prepay, ticket, total, '-', 0, 0, 'charge']
                COMMAND2 = COMMAND2.join(' ')
                console.log('COMMAND=', COMMAND2) 
                exec( COMMAND2, function(error, stdout, stderr) {
                    if (error !== null) {
                        console.log('exec error: ' + error)
                        return
                    }
                    console.log(stdout) 
                })
            })
            let template = fs.readFile('topmenu.html', 'utf-8', function (err, data) {
                res.writeHead(200, {
                    'content-Type': 'text/html'
                })
                res.write(data)
                res.end()
           })
        },
        'shiharai': function () {
            COMMAND = ['node iroha04.js', accountid+'@nihon', priv_key, prepay, ticket, total, 'shiharai']
            COMMAND = COMMAND.join(" ")
            console.log('COMMAND=', COMMAND) 
            exec( COMMAND, function(error, stdout, stderr) {
                if (error !== null) {                //コマンドのエラー処理
                    console.log('exec error: ' + error)
                    console.log('stderr: ' + stderr)
                    console.log('stdout: ' + stdout)
                    return
                }
                console.log(stdout)
                //PostgreSQLへの登録
                COMMAND2 = ['node pg_shiharai.js', accountid + '@nihon', prepay, ticket, total, shisetsu, ninzu, usetime, 'shiharai']
                COMMAND2 = COMMAND2.join(' ')
                console.log('COMMAND=', COMMAND2) 
                exec( COMMAND2, function(error, stdout, stderr) {
                    if (error !== null) {
                        console.log('exec error: ' + error)
                        return
                    }
                    console.log(stdout) 
                })

            })
            let template = fs.readFile('topmenu.html', 'utf-8', function (err, data) {
                res.writeHead(200, {
                'content-Type': 'text/html'
            })
            res.write(data)
            res.end()
           })
        },
        'err_kizon': function () {
            let template = fs.readFile('err_kizon.html', 'utf-8', function (err, data) {
                res.writeHead(200, {
                'content-Type': 'text/html'
            })
            res.write(data)
            res.end()
           })
        },
        'err_message': function () {
            let template = fs.readFile('err_message.html', 'utf-8', function (err, data) {
                res.writeHead(200, {
                'content-Type': 'text/html'
            })
            if (err_aplmsg !== '') {
                data = data.replace('ERROR_MSG', err_aplmsg)
            }
            res.write(data)
            res.end(err_sysmsg)
            err_msg = ''
           })
        }
    }

    uri = url.parse(req.url).pathname                    // uriにurlのpathをセット
 
    if (req.method == 'POST' && uri !== '/') {
        accountid = name = kana = adds = tel = bd = null // 変数初期化
        pub_key = priv_key = null                        // 変数初期化
        prepay = ticket = total = null                   // 変数初期化
        shisetsu = ninzu = usetime = null                // 変数初期化
        body = err_sysmsg = err_aplmsg = ''              // 変数初期化
        req.setEncoding('utf8')               // エンコード形式をutf8に指定
        req.on('data', function(chunk) {
            body += chunk
        })
        req.on('end', function() {
            if (uri === '/nyuukai') {            // http://localhost:8080/nyuukai 
                if (body.match(/accountid=(.+).name/) !== null){          // FORMタグのアカウント名を取得
                    if (fs.existsSync(KEY_DIR + body.match(/accountid=(.+).name/)[1] + '@nihon.pub')) {
                        Response['err_kizon']()                           // 既存アカウントエラー
                    } else {
                        accountid = body.match(/accountid=(.+).name/)[1]
                        // キーペアを作成
                        exec('node keycreate.js ' + 'nihon ' + accountid, function(error, stdout, stderr) {
                            if (error !== null) {                         // コマンドのエラー処理
                                console.log('exec error: ' + error)
                                return
                            }
                            FileName = KEY_DIR + accountid + '@nihon.pub'
                            pub_key = fs.readFileSync( FileName, {encoding: "utf-8"})
                            pub_key = pub_key.replace(/\r?\n/g, "") 
                            if (body.match(/name=(.+)&kana/) !== null){   // FORMタグの名前を取得
                                name = decodeURI(body.match(/name=(.+)&kana/)[1])
                            }
                            if (body.match(/kana=(.+)&adds/) !== null){   // FORMタグのかなを取得
                                kana = decodeURI(body.match(/kana=(.+)&adds/)[1])
                            }
                            if (body.match(/adds=(.+)&tel/) !== null){    // FORMタグの住所を取得
                                adds = decodeURI(body.match(/adds=(.+)&tel/)[1])
                            }
                            if (body.match(/tel=(.+)&bd/) !== null){      // FORMタグの電話を取得
                                tel = body.match(/tel=(.+)&bd/)[1] 
                            }
                            if (body.match(/bd=(.+)/) !== null){          // FORMタグの誕生日を取得
                                bd = unescape(body.match(/bd=(.+)/)[1]) 
                            }
                            Response['nyuukai']()                         // 入会処理を実施
                        })
                    }
                } else {
                    Response['topmenu']()                             // Topメニューに戻る()
                }
                return
            } else if (uri === '/zandaka1' || uri === '/zandaka2') {  // http://localhost:8080/zandaka1 および zandaka2
                console.log(body)
                if (body.match(/accountid=(.+)/) !== null){
                    accountid = body.match(/accountid=(.+)/)[1]        // FORMタグのアカウント名を取得
                    // irohaへの登録
                    COMMAND = ['node iroha01.js', accountid + '@nihon']
                    COMMAND = COMMAND.join(' ')
                    exec( COMMAND, function(error, stdout, stderr) {
                        if (error !== null) {                         // コマンドのエラー処理
                            console.log('exec error: ' + error)
                            return
                        }
                        // 残高を抽出(改行が含まれるので注意)
                        if (stdout.match(/prepay#nihon.*\n.*\n.*balance: '(.*)'/) !== null) {
                            prepay = stdout.match(/prepay#nihon.*\n.*\n.*balance: '(.*)'/)[1]
                        } else {
                            prepay = 0
                        }
                        if (stdout.match(/ticket#nihon.*\n.*\n.*balance: '(.*)/) !== null) {
                            ticket = stdout.match(/ticket#nihon.*\n.*\n.*balance: '(.*)'/)[1]
                        } else {
                            ticket = 0
                        }
                        // エラーメッセージを採取
                        if (stderr.match(/actual=ERROR_RESPONSE\nReason: {(.*)}/) !== null) {
                            err_sysmsg = stderr.match(/actual=ERROR_RESPONSE\nReason: {(.*)}/)[1]
                            err_aplmsg = 'ご指定のアカウントが見つかりません'
                            console.log(err_sysmsg)
                        }
                        console.log(stdout)
                        console.log('prepay/ticket', prepay, ticket)
                        if (err_sysmsg !== '') {
                            Response['err_message']()
                        } else if (uri === '/zandaka1') {
                            Response['zandaka1']()
                        } else { 
                            Response['zandaka2']()
                        }
                    })
                } else {
                    Response['topmenu']()
                }
                return
            } else if (uri === '/charge') {  // http://localhost:8080/charge
                console.log(body)
                if (body.match(/accountid=(.+).prepay/) !== null){  // FORMタグのアカウント名を取得
                    accountid = body.match(/accountid=(.+).prepay/)[1]
                    if (body.match(/prepay=(.+)&ticket/) !== null){ // FORMタグのチャージを取得
                        prepay = body.match(/prepay=(.+)&ticket/)[1]
                    }
                    if (body.match(/ticket=(.+)&total/) !== null){  // FORMタグの回数券を取得
                        ticket = body.match(/ticket=(.+)&total/)[1]
                    }
                    if (body.match(/total=(.+)/) !== null){         // FORMタグのお支払現金を取得
                        total = body.match(/total=(.+)/)[1]
                    }
                    FileName = KEY_DIR + accountid + '@nihon.priv'
                    priv_key = fs.readFileSync( FileName, {encoding: "utf-8"})
                    priv_key = priv_key.replace(/\r?\n/g, "") 
                    console.log('accountid/priv_key', accountid, priv_key)
                    console.log('prepay/ticket/total', prepay, ticket, total)
                    Response['charge']()
                } else {
                    Response['topmenu']()
                }
                return
            } else if (uri === '/shiharai') {  // http://localhost:8080/shiharai
                console.log(body)
                if (body.match(/accountid=(.+).shisetsu=/) !== null){   // FORMタグのアカウント名を取得
                    accountid = body.match(/accountid=(.+).shisetsu=/)[1]
                    if (body.match(/shisetsu=(.+)&ninzu=/) !== null){   // FORMタグの利用施設を取得
                        shisetsu = decodeURI(body.match(/shisetsu=(.+)&ninzu=/)[1])
                    }
                    if (body.match(/ninzu=(.+)&usetime=/) !== null){    // FORMタグの人数を取得
                        ninzu = body.match(/ninzu=(.+)&usetime=/)[1]
                    }
                    if (body.match(/usetime=(.+)&prepay_/) !== null){   // FORMタグの利用時間を取得
                        usetime = body.match(/usetime=(.+)&prepay_/)[1]
                    }
                    if (body.match(/prepay=(.+)&ticket_/) !== null){    // FORMタグのチャージを取得
                        prepay = body.match(/prepay=(.+)&ticket_/)[1]
                    }
                    if (body.match(/ticket=(.+)&total=/) !== null){     // FORMタグの回数券を取得
                        ticket = body.match(/ticket=(.+)&total=/)[1]
                    }
                    if (body.match(/total=(.+)&button1=/) !== null){    // FORMタグのお支払現金を取得
                        total = body.match(/total=(.+)&button1=/)[1]
                    }
                    FileName = KEY_DIR + accountid + '@nihon.priv'
                    priv_key = fs.readFileSync( FileName, {encoding: "utf-8"})
                    priv_key = priv_key.replace(/\r?\n/g,"") 
                    console.log('accountid/priv_key', accountid, priv_key)
                    console.log('shisetu/ninzuu/usetime', shisetsu, ninzu, usetime)
                    console.log('prepay/ticket/total', prepay, ticket, total)
                    Response['shiharai']()
                } else {
                    Response['topmenu']()
                }
                return
            } else {                             // URLがに該当がない場合はtopmenuを表示
                Response['topmenu']()
                return
            }
        })
    } else {
        // URIで行う処理を分岐させる
        if (uri === '/topmenu') {            // http://localhost:8080/topmenu 
            Response['topmenu']() 
            return
        } else if (uri === '/kaiin_input') { // http://localhost:8080/kaiin_input
            Response['kaiin_input']()
            return
        } else {                             // URLがに該当がない場合はtopmenuを表示
            Response['topmenu']()
            return
        }
    }
})

// 8080ポートでコネクションの受け入れを開始する
server.listen(8080)
console.log('Server running at http://localhost:8080/')
