/**
 * 存在しないパスにアクセスした時に表示するエラーコンポーネント
 */

import { ReactElement } from "react";
import { Link } from 'react-router-dom';

/**
 * NoPageコンポーネント
 */
function NoPage():ReactElement {
    return (
        <div className="App">
            <main style={{ padding: "1rem" }}>
                <p>
                    There's nothing here!
                </p>
                <Link to={{ pathname: '/'}}>
                    メインメニューに戻る
                </Link>
            </main>
        </div>
    );
}

export default NoPage