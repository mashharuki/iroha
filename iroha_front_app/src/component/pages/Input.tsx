/**
 * 新規アカウント登録コンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import Input2 from '@material-ui/core/Input';
import UseStyles from "../common/UseStyles";
import superAgent from 'superagent';
import { 
    CommandService_v1Client as CommandService,
    QueryService_v1Client as QueryService
} from 'iroha-helpers-ts/lib/proto/endpoint_pb_service'
import queries from 'iroha-helpers-ts/lib/queries'
import commands from 'iroha-helpers-ts/lib/commands'

/**
 *  Inputコンポーネント
 */
function Input():ReactElement {
    // ステート変数
    const [ domain, setDomain ] = useState('nihon')
    const [ accountId, setAccoutId ] = useState('')
    const [ name, setName ] = useState('')
    const [ kana, setKana ] = useState('')
    const [ adds, setAdds ] = useState('')
    const [ tel, setTel ] = useState('')
    const [ bd, setBd ] = useState('')
    const [ ed, setEd ] = useState('')
    const [ block, setBlock ] = useState('')
    const [ values, setValues ] = useState({
        accountId : accountId + '@' + domain, 
        name: name, 
        kana: kana, 
        adds: adds, 
        tel: tel, 
        bd: bd, 
        ed: ed, 
        block: block
    })
    // スタイルコンポーネント用の変数
    const classes = UseStyles()
    // APIサーバーのURL
    const baseUrl = "http://localhost:3001"
    // Hyperleder Iroha用のアドレス情報
    const IROHA_ADDRESS = 'localhost:50051'
    // adminのアカウントと秘密鍵情報(開発用)
    const adminId = 'admin@test'
    const adminPriv = 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'
    // コマンドを利用するためのインスタンスを生成
    const commandService = new CommandService(IROHA_ADDRESS)
    // クエリを利用するためのインスタンスを生成
    const queryService = new QueryService(IROHA_ADDRESS)
    
    /**
     * アカウント作成関数
     */
    const createAcount = ():any => {
         // 現在日付を取得する。
        let dt = new Date()                    
        const year = dt.getFullYear() + 3     
        const month = dt.getMonth() + 1         
        const date = dt.getDate()               
        // 期限を生成して変数にセット
        setEd(year + '/' + month + '/' + date)

        // 生成したブロック情報を取得する設定
        queries.fetchCommits({
            privateKey: adminPriv,
            creatorAccountId: adminId,
            queryService,
            timeoutLimit: 5000
        },
        (bk) => {
            console.log('fetchCommits new block:', bk)
            // ブロック高の情報が存在する場合は、ブロック高の値をセットする。
            if (bk.match(/height: (\d+),/) !== null){
                // ステート変数に値を詰める。
                setBlock(bk.match(/height: (\d+),/)[1])
            }
        },
        (error) => console.error('fetchCommits failed:', error.stack))
        
        // 公開鍵用の変数を用意する。
        let publicKey = '';
        // APIを呼び出して公開鍵を取得する。
        superAgent
            .get(baseUrl + '/api/publicKey')
            .end((err, res) => {
                if (err) {
                    console.log("API呼び出し中に失敗", err)
                    return err;
                }
                // 結果を取得する。
                console.log("API呼び出し結果：", res.body.publicKey);
                publicKey = res.body.publicKey;
            });

        // アカウント作成処理
        Promise.all([
            // createAccountコマンドを呼び出す。
            commands.createAccount({
                privateKeys: [adminPriv],
                creatorAccountId: adminId,
                quorum: 1,
                commandService,
                timeoutLimit: 5000
            },{
                accountName: accountId,
                domainId: domain,
                publicKey: publicKey
            })
        ])
        .then(a => {
            console.log("アカウント作成成功：", a);
            // パラメータ情報をセットする。
            setValues({
                ...values,
                accountId: accountId + '@' + domain, 
                name: name, 
                kana: kana, 
                adds: adds, 
                tel: tel, 
                bd: bd, 
                ed: ed, 
                block: block
            });
        })
        .catch(e => console.error("アカウント作成失敗：", e))
    }

    /**
     * 登録用のAPIを呼び出してアカウント情報を登録する。
     */
    const inputAction = async():Promise<any> => {
        // ブロックチェーン上にアカウント情報を作成する。
        await createAcount();
        // API用のパラメータ変数
        const params = { values: [values] };
        // 登録用のAPIを呼び出す。
        superAgent
            .get(baseUrl + '/api/input')
            .query(params) 
            .end((err, res) => {
                if (err) {
                    console.log("API呼び出し中に失敗", err)
                    return err;
                }
                // 結果を取得する。
                // const r = res.body.rows;
                console.log("API呼び出し結果：", res);
            });
        return
    }

    return (
        <div className="App">
            <h2>
                新規会員登録ページ
            </h2>
            <br/>
            <br/>
            アカウント：
            <Input2
                id="accountId" 
                value={accountId} 
                className={classes.textField}
                onChange={ (e:any) => setAccoutId(e.target.value) } 
            />
            <br/>
            名前：
            <Input2
                id="name" 
                value={name} 
                className={classes.textField}
                onChange={ (e:any) => setName(e.target.value) } 
            /><br/>
            かな：
            <Input2
                id="kana" 
                value={kana} 
                className={classes.textField}
                onChange={ (e:any) => setKana(e.target.value) } 
            /><br/>
            住所：
            <Input2
                id="adds" 
                value={adds} 
                className={classes.textField}
                onChange={ (e:any) => setAdds(e.target.value) } 
            /><br/>
            電話：
            <Input2
                id="tel" 
                value={tel} 
                className={classes.textField}
                onChange={ (e:any) => setTel(e.target.value) } 
            /><br/>
            誕生日：
            <Input2
                id="bd" 
                value={bd} 
                className={classes.textField}
                onChange={ (e:any) => setBd(e.target.value) } 
            /><br/><br/>
            <Button variant="contained" color="secondary" onClick={inputAction}>
                登録
            </Button>
            <br/>
            <br/>
            <Link to={{ pathname: '/'}}>
                メインメニューに戻る
            </Link>
        </div>
    );
}

export default Input