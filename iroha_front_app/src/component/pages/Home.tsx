/**
 * トップページ用のコンポーネントファイル
 */

import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { Link, useLocation } from 'react-router-dom';
import UseStyles from "../common/UseStyles";

/**
 * Homeコンポーネント
 */
function Home() {
    // ステート変数
    const [ accountId, setAccountId ] = useState('');
    const [ domain, setDomain ] = useState('nihon');
    const classes = UseStyles();
    const location = useLocation();
    // loginAccoutId用変数
    let loginAccountId:string = '';
    // 「チャージ」ボタンを押した時の遷移先と渡す情報
    const ToCharge = { 
        accountId: accountId,
        domain: domain,
    };
    // 「支払」と「送金」ボタンを押した時の遷移先と渡す情報
    const ToPay = { 
        accountId: accountId,
        domain: domain,
    };
    // 「取引履歴照会」ボタンを押した時の遷移先と渡す情報
    const ToTxHistory = { 
        accountId: accountId,
        domain: domain,
    };

    /**
     * 副作用フック
     */
     useEffect(() => {
        // 遷移元で入力したアカウントIDとドメインの情報を取得する。
        loginAccountId = location.state.accountId;
        // ステート変数をセットする。
        setAccountId(loginAccountId);
    }, []);

    return (
        <div className="App">
            <h2>
                ホーム画面
            </h2>
            <Button variant="contained" color="secondary" className={classes.button}>
                <Link to='/charge' state={ToCharge}>
                    1．チャージ
                </Link>
            </Button><br/><br/>
            <Button variant="contained" color="secondary" className={classes.button}>
                <Link to='/pay' state={ToPay}>
                    2．支払
                </Link>
            </Button><br/><br/>
            <Button variant="contained" color="secondary" className={classes.button}>
                <Link to='/send' state={ToPay}>
                    3．送金
                </Link>
            </Button><br/><br/>
            <Button variant="outlined" color="primary">
                <Link to='/txHistory' state={ToTxHistory}>
                    取引履歴照会
                </Link>
            </Button>
        </div>
    );
}

export default Home