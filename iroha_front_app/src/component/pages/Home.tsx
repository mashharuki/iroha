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
        pathname: 'http://localhost:8080/zandaka1',
        state: { accountId: chargeAccountId },
    };
    // 「支払いアカウント」ボタンを押した時の遷移先と渡す情報
    const ToPay = { 
        pathname: 'http://localhost:8080/zandaka2',
        state: { accountId: payAccountId },
    };

    return (
        <div className="App">
            <h2>
                処理メニュー
            </h2>
            <Link to={{ pathname: 'http://localhost:8080/kaiin_input'}}>
                １．新規会員登録
            </Link>
            <br/>
            <br/>
            チャージアカウント：
            <Input 
                id="chargeAccountId" 
                value={chargeAccountId} 
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