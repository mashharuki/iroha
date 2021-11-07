/**
 * 支払ページ用コンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import UseStyles from "../common/UseStyles";

/**
 * Payコンポーネント
 */
function Pay(props:any):ReactElement {
    // ステート変数
    const [ accountId, setAccoutId ] = useState('')
    // chargAccoutId用変数
    let payAccountId:string = ''
    const location = useLocation();

    /**
     * 副作用フック
     */
     useEffect(() => {
        console.log("props:", location)
        // 遷移元で入力したアカウントIDの情報を取得する。
        payAccountId = location.state.accountId;
        // ステート変数をセットする。
        setAccoutId(payAccountId)
    }, []);

    return (
        <div className="App">
            <h2>
                支払いページ
            </h2>
            <p>
                対象アカウントID：　{accountId}
            </p>
            <Button variant="contained" color="secondary">
                支払い実行
            </Button>
            <Link to={{ pathname: '/'}}>
                メインメニューに戻る
            </Link>
        </div>
    );
}
 
export default Pay