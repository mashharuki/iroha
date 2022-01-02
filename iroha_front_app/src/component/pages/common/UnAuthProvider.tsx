/**
 * 未ログイン状態を管理するコンポーネントをまとめるファイル
 */

import { Route, Navigate, RouteProps, useLocation } from "react-router-dom";
import React from 'react';
import { useAuthUser } from "./AuthUserContext";

/**
 * UnAuthRouteコンポーネント
 * @param param0 引数
 * @returns 
 */
const UnAuthRoute: React.FC<RouteProps> = ({ ...props }) => {
    // コンテキストを作成
    const authUser = useAuthUser()
    // ログイン済み確認フラグ
    const isAuthenticated = authUser != null

    // 遷移先を制御する。
    if (isAuthenticated) {
        console.log(`ログイン済みのユーザーは${props.path}へはアクセスできません`)
        return <Navigate to="/login" />
    } else {
        return <Route {...props} />
    }
}

export default UnAuthRoute;