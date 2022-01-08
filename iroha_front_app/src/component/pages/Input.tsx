/**
 * 新規アカウント登録コンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import Input2 from '@material-ui/core/Input';
import UseStyles from "../common/UseStyles";
import superAgent from 'superagent';

/**
 *  Inputコンポーネント
 */
function Input() {
    // ステート変数
    const [ domain, setDomain ] = useState('nihon')
    const [ accountId, setAccoutId ] = useState('')
    const [ name, setName ] = useState('')
    const [ kana, setKana ] = useState('')
    const [ adds, setAdds ] = useState('')
    const [ tel, setTel ] = useState('')
    const [ bd, setBd ] = useState('')
    const [ ed, setEd ] = useState('')
    const [ password, setPassword ] = useState('')
    // スタイルコンポーネント用の変数
    const classes = UseStyles()
    // APIサーバーのURL
    const baseUrl = process.env.REACT_APP_API_SERVER_URL;
    
    /**
     * 登録用のAPIを呼び出してアカウント情報を登録する。
     */
    const inputAction = () => {
        // 現在日付を取得する。
        let dt = new Date()                    
        const year = dt.getFullYear() + 3     
        const month = dt.getMonth() + 1         
        const date = dt.getDate()       
        let edate = year.toString() + '/' + month.toString() + '/' + date.toString();  
        console.log("期限：", edate);      
        // 期限を生成して変数にセット
        setEd(edate);
        // API用のパラメータ変数
        const params = { 
            domain: domain,
            accountId: accountId,
            name: name, 
            kana: kana, 
            adds: adds, 
            tel: tel, 
            bd: bd, 
            ed: edate,
            password: password,
        };

        // 登録用のAPIを呼び出す。
        superAgent
            .get(baseUrl + '/api/input')
            .query(params) 
            .end((err, res) => {
                if (err) {
                    console.log("API呼び出し中に失敗", err)
                    return err;
                }
                console.log("API呼び出し結果：", res);
            });
    }

    return (
        <div className="App">
            <h2>新規会員登録ページ</h2><br/><br/>
            アカウントID：
            <Input2
                id="accountId" 
                value={accountId} 
                className={classes.textField}
                onChange={ (e:any) => setAccoutId(e.target.value) } 
            /><br/>
            パスワード：
            <Input2
                id="password" 
                value={password} 
                className={classes.textField}
                onChange={ (e:any) => setPassword(e.target.value) } 
            /><br/>
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
            </Button><br/><br/>
            <Link to={{ pathname: '/login'}}>
                ログイン画面に戻る
            </Link>
        </div>
    );
}

export default Input