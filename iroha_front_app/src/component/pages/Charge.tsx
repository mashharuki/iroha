/**
 * チャージページ用コンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link, useLocation } from 'react-router-dom';

/**
 * Chargeコンポーネント
 */
function Charge(props:any):ReactElement {
    // ステート変数
    const [ accountId, setAccoutId ] = useState('')
    // chargAccoutId用変数
    let chargeAccountId:string = ''
    const location = useLocation();

    /**
     * 副作用フック
     */
     useEffect(() => {
        console.log("props:", location)
        // 遷移元で入力したアカウントIDの情報を取得する。
        chargeAccountId = location.state.accountId;
        // ステート変数をセットする。
        setAccoutId(chargeAccountId)
    }, []);

    return (
        <div className="App">
            <h2>
                チャージページ
            </h2>
            <p>
                対象アカウントID：　{accountId}
            </p>
            <Link to={{ pathname: '/'}}>
                メインメニューに戻る
            </Link>
        </div>
    );
}
 
export default Charge