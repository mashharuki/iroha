/**
 * 送金画面用のコンポーネントファイル
 */

import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@material-ui/core";
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Input from '@material-ui/core/Input';
import InputAdornment from '@mui/material/InputAdornment';
import UseStyles from "../common/UseStyles";
import superAgent from 'superagent';

// APIサーバーのURL
const baseUrl = process.env.REACT_APP_API_SERVER_URL;

/**
 * Sendコンポーネント
 * @param props 引数
 */
function Send(props:any) {
    // ステート変数
    const [ accountId, setAccoutId ] = useState('');
    const [ prepay, setPrepay ] = useState(0);
    const [ counter, setCounter ] = useState(0);
    const [ domain, setDomain ] = useState('');
    const [ room, setRoom ] = useState('');
    const [ people, setPeople ] = useState(0);
    const [ useTime, setUseTime ] = useState(0);
    const [ total, setTotal ] = useState(0);
    const [ successFlg, setSuccessFlg ] = useState(true);
    // chargAccoutId用変数
    let sendAccountId:string = ''
    // chargeDomain用変数
    let sendDomain:string = '';   
    const location = useLocation();
    const classes = UseStyles();
    // 「取引履歴照会」ボタンを押した時の遷移先と渡す情報
    const ToTxHistory = { 
        accountId: accountId,
        domain: domain,
    };

    /**
     * 副作用フック
     */
     useEffect(() => {
        // 遷移元で入力したアカウントIDの情報を取得する。
        sendAccountId = location.state.accountId;
        sendDomain = location.state.domain;
        // ステート変数をセットする。
        setAccoutId(sendAccountId);
        setDomain(sendDomain);
    }, []);

    /**
     * 「送金」ボタンを押した時に処理する関数
     */
    const sendAction = () => {
        // API用のパラメータ変数
        const params = {
            prepay: prepay,
            counter: counter,
            total: total,
            accountId: accountId,
            domain: domain,
            room: room,
            people: people,
            useTime: useTime,
        };

        // 送金処理用のAPIを呼び出す。
        superAgent
            .post(baseUrl + '/api/send')
            .query(params) 
            .end((err, res) => {
                if (err) {
                    console.log("送金処理用API呼び出し中に失敗", err);
                    // successFlgをfalseにする。
                    setSuccessFlg(false);
                    return err;
                }
                console.log("送金処理用API呼び出し結果：", res);
                setSuccessFlg(true);
                alert("送金処理成功!");
            });
    }

    return (
        <div className="App">
            <h2>
                送金ページ
            </h2>
            <p>
                対象アカウントID：　{accountId}
            </p>
            <br/>
            { !successFlg ? (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        送金処理に失敗しました。
                    </Alert>
                </Stack>
            ) : <></>}
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                <Grid item>
                    宛先アカウントID：
                </Grid>
                <Grid item>
                    <Input id="room" className={classes.textField} onChange={(e:any) => { setRoom(e.target.value) }}/>
                </Grid>
            </Grid><br/>
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                <Grid item>
                    送金額：
                </Grid>
                <Grid item>
                    <Input 
                        id="sendAmount" 
                        className={classes.textField} 
                        onChange={(e:any) => { setTotal(e.target.value) }}
                        startAdornment={<InputAdornment position="start">¥</InputAdornment>} />
                </Grid>
            </Grid><br/>
            <Button variant="contained" color="secondary" onClick={sendAction}>
                送金処理実行
            </Button><br/><br/>
            <Button variant="outlined" color="primary">
                <Link to='/txHistory' state={ToTxHistory}>
                    取引履歴照会
                </Link>
            </Button><br/><br/>
            <Link to={{ pathname: '/'}} state={ToTxHistory}>
                メインメニューに戻る
            </Link>
        </div>
    );
};

export default Send;
