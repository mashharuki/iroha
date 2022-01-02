/**
 * ログイン状態をチェックするコンポーネントファイル
 */

import { Route, Navigate, RouteProps, Routes } from "react-router-dom";
import React from 'react';
import { useAuthUser } from "./AuthUserContext";
import Home from "./../Home";
import Input from './../Input';
import Pay from './../Pay';
import Charge from './../Charge';
import NoPage from './../NoPage';
import TxHistory from './../TxHistory';
import UseStyles from "./../../common/UseStyles";
import Login from './../Login';

/**
 * PrivateRouteコンポーネント
 * @param param0 引数
 * @returns 
 */
const PrivateRoute: React.FC<RouteProps> = ({...props}) => {
  // コンテキストを作成
  const authUser = useAuthUser();
  // ログイン済み確認フラグ
  // const isAuthenticated = authUser != null
  const isAuthenticated = true;
  // 遷移先を変更する。
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<Input />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/charge" element={<Charge />} />
        <Route path="/txHistory" element={<TxHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    );
  }else{
    console.log(`ログインしていないユーザーは${props.path}へはアクセスできません`)
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;