/**
 * ログイン状態をチェックするコンポーネントファイル
 */

import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Navigate } from 'react-router-dom';

/**
 * ログイン状態をチェックするコンポーネント
 * @param param0 パラメータ
 * @returns アクセス先のページのパスかログイン画面のパス
 */
const PrivateRoute: React.FC<RouteProps> = ({...props}) => {
    // const authUser = useAuthUser()
    // const isAuthenticated = authUser != null //認証されているかの判定
    const isAuthenticated = true;
    if (isAuthenticated) {
        return <Route {...props}/>
    }else{
        console.log(`ログインしていないユーザーは${props.path}へはアクセスできません`);
        return <Navigate to="/login"/>
    }
}

export default PrivateRoute;