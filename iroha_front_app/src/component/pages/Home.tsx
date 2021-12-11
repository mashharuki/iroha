/**
 * トップページ用のコンポーネントファイル
 */

import React, { useState, useEffect, ReactElement } from "react";
import Button from '@material-ui/core/Button';
import { Link  } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import UseStyles from "../common/UseStyles";

/**
 * Homeコンポーネント
 */
function Home():ReactElement {
    // ステート変数
    const [ chargeAccountId, setChargeAccountId ] = useState('');
    const [ payAccountId, setPayAccountId ] = useState('');
    const [ domain, setDomain ] = useState('nihon');
    const classes = UseStyles();
    // 「チャージアカウント」ボタンを押した時の遷移先と渡す情報
    const ToCharge = { 
        accountId: chargeAccountId,
        domain: domain,
    };
    // 「支払いアカウント」ボタンを押した時の遷移先と渡す情報
    const ToPay = { 
        accountId: payAccountId,
        domain: domain,
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
            <Button variant="contained" color="secondary">
                <Link to='/charge' state={ToCharge}>
                    ２．チャージ
                </Link>
            </Button>
            <br/>
            <br/>
            支払いアカウント：　
            <Input 
                id="payAccountId" 
                value={payAccountId} 
                className={classes.textField}
                onChange={ (e) => setPayAccountId(e.target.value) } 
                placeholder="Set account ID" 
            />
            <Button variant="contained" color="secondary" >
                <Link to='/pay' state={ToPay}>
                    ３．支払
                </Link>
            </Button>
        </div>
    );
}

export default Home