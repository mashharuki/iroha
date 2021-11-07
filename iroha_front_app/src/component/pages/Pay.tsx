/**
 * 支払ページ用コンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link } from 'react-router-dom';

/**
 * Payコンポーネント
 */
function Pay(props:any):ReactElement {
    return (
        <div className="App">
            <h2>
                支払いページ
            </h2>
            <Link to={{ pathname: '/'}}>
                メインメニューに戻る
            </Link>
        </div>
    );
}
 
export default Pay