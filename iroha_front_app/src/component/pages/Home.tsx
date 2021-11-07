/**
 * トップページ用のコンポーネントファイル
 */

import React, { useState, useEffect, ReactElement } from "react";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import UseStyles from "../common/UseStyles";

/**
 * Homeコンポーネント
 */
function Home():ReactElement {
    // ステート変数
    const [ chargeAccountId, setChargeAccountId ] = useState('');
    const [ payAccountId, setPayAccountId ] = useState('');
    const classes = UseStyles();
    // 「チャージアカウント」ボタンを押した時の遷移先と渡す情報
    const ToCharge = { 
        pathname: '/charge',
        state: { accountId: chargeAccountId },
    };
    // 「支払いアカウント」ボタンを押した時の遷移先と渡す情報
    const ToPay = { 
        pathname: '/pay',
        state: { accountId: payAccountId },
    };

    return (
        <div className="App">
            <h2>
                メインメニュー
            </h2>
            <Link to={{ pathname: '/input'}}>
                １．新規会員登録
            </Link>
            <br/>
            <br/>
            チャージアカウント：　
            <Input 
                id="chargeAccountId" 
                value={chargeAccountId} 
                className={classes.textField}
                onChange={ (e) => setChargeAccountId(e.target.value) } 
                placeholder="Set account ID" 
            />
            <Button variant="contained" color="primary" component={Link} to={ToCharge} >
                ２．チャージ
            </Button>
            <br/>
            支払いアカウント：　
            <Input 
                id="payAccountId" 
                value={payAccountId} 
                className={classes.textField}
                onChange={ (e) => setPayAccountId(e.target.value) } 
                placeholder="Set account ID" 
            />
            <Button variant="contained" color="primary" component={Link} to={ToPay} >
                ３．支払
            </Button>
        </div>
    );
}

export default Home