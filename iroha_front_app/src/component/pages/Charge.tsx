/**
 * チャージページ用コンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link } from 'react-router-dom';

/**
 * Chargeコンポーネント
 */
function Charge(props:any):ReactElement {
    return (
        <div className="App">
            <h2>
                チャージページ
            </h2>
            <Link to={{ pathname: '/'}}>
                メインメニューに戻る
            </Link>
        </div>
    );
}
 
export default Charge