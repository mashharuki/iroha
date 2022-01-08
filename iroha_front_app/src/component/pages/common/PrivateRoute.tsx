/**
 * ログイン状態をチェックするコンポーネントファイル
 */

import { Route, Navigate, RouteProps, Routes } from "react-router-dom";
import React, { useEffect } from 'react';
import Home from "./../Home";
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
  
  // 遷移先を変更する。
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/charge" element={<Charge />} />
      <Route path="/txHistory" element={<TxHistory />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default PrivateRoute;