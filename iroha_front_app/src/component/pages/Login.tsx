/**
 * ログイン画面用のコンポーネント
 */

import React, { useState, useEffect, ReactElement, useContext } from "react";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Input from '@material-ui/core/Input';
import UseStyles from "../common/UseStyles";
import superAgent from 'superagent';
import { useLogin } from "./common/AuthUserContext";
 
/**
 *  Loginコンポーネント
 */
function Login() {
    // ステート変数
    const [ domain, setDomain ] = useState('nihon');
    const [ accountId, setAccoutId ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ successFlg, setSuccessFlg ] = useState(true);
    const [ loginCheckFlg, setLoginCheckFlg ] = useState(false);
    const auth = useLogin();
    // ログインに成功した時に遷移先に渡すデータを定義する。
    const ToTxHistory = {
        domain: domain,
        accountId: accountId,
    };

    // スタイルコンポーネント用の変数
    const classes = UseStyles();
    // APIサーバーのURL
    const baseUrl = "http://localhost:3001";

    // ここにデータベースに照会する処理を追加する。
    const loginAction = () => {
        // API用のパラメータ変数
        const params = { 
            domain: domain,
            accountId: accountId,
            password: password,
        };

        // 登録用のAPIを呼び出す。
        superAgent
            .post(baseUrl + '/api/login')
            .query(params) 
            .then(res => {
                console.log("API呼び出し結果：", res.body);
                // 取得結果を確認する。
                if(res.body.length >= 1){
                    setLoginCheckFlg(true);
                    // authuserにログインIDをセットする。
                    auth(accountId);
                } else {
                    setSuccessFlg(false);
                }
            })
            .catch(e => {
                console.log("API呼び出し失敗：",e.message);
                setSuccessFlg(false);
                return ;
            });
    };

    return (
        <div className="App">
            { 
                // ログインに成功した場合は、取引照会画面に遷移する。
                loginCheckFlg ? ( <Navigate to="/txHistory" state={ToTxHistory} /> ) : <></> 
            } 
            <h2>ログイン画面</h2><br/><br/>
            { !successFlg ? (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        入力内容に誤りがございます。<strong>再度、ご確認をお願いいたします。</strong>
                    </Alert>
                </Stack>
            ) : <></>}
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
    );
}

export default Login;