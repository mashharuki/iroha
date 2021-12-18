/**
 * ログイン画面用のコンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import UseStyles from "../common/UseStyles";
import superAgent from 'superagent';
 
/**
 *  Loginコンポーネント
 */
function Login():ReactElement {
    // ステート変数
    const [ domain, setDomain ] = useState('nihon');
    const [ accountId, setAccoutId ] = useState('');
    const [ password, setPassword ] = useState('');

    // スタイルコンポーネント用の変数
    const classes = UseStyles();
    // APIサーバーのURL
    const baseUrl = "http://localhost:3001";

    // ここにデータベースに照会する処理を追加する。
    const loginAction = () => {};

    return (
        <div className="App">
            <h2>ログイン画面</h2><br/><br/>
            アカウントID：
            <Input
                id="accountId" 
                value={accountId} 
                className={classes.textField}
                onChange={ (e:any) => setAccoutId(e.target.value) } 
            /><br/>
            パスワード：
            <Input
                id="password" 
                value={password} 
                className={classes.textField}
                onChange={ (e:any) => setPassword(e.target.value) } 
            /><br/><br/>
            <Button variant="contained" color="secondary" onClick={loginAction}>
                ログイン
            </Button><br/><br/>
            <Link to={{ pathname: '/'}}>
                ホーム画面に戻る
            </Link>
        </div>
    )
}

export default Login;