/**
 * 新規アカウント登録コンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link } from 'react-router-dom';

function Input():ReactElement {
    return (
        <div className="App">
            <h2>
                新規会員登録ページ
            </h2>
            <Link to={{ pathname: '/'}}>
                メインメニューに戻る
            </Link>
        </div>
    );
}

export default Input