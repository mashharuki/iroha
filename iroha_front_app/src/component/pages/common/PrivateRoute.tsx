/**
 * ログイン状態をチェックするコンポーネントファイル
 */

import { Route, Navigate, RouteProps, Routes } from "react-router-dom";
import React, { useEffect } from 'react';
import { useAuthUser } from "./AuthUserContext";
import Home from "./../Home";
import Input from './../Input';
import Pay from './../Pay';
import Charge from './../Charge';
import NoPage from './../NoPage';
import TxHistory from './../TxHistory';
import Login from './../Login';

/**
 * PrivateRouteコンポーネント
 * @param param0 引数
 * @returns 
 */
const PrivateRoute: React.FC<RouteProps> = ({...props}) => {
  // コンテキストを作成
  let authUser = useAuthUser();
  // ログイン済み確認フラグ
  let isAuthenticated = authUser != null;

  // 遷移先を変更する。
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/charge" element={<Charge />} />
      <Route path="/txHistory" element={<TxHistory />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default PrivateRoute;