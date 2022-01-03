/**
 * 未ログイン状態を管理するコンポーネントをまとめるファイル
 */

import { Route, Routes, RouteProps, } from "react-router-dom";
import React from 'react';
import { useAuthUser } from "./AuthUserContext";
import Input from './../Input';
import NoPage from './../NoPage';
import Login from './../Login';

/**
 * UnAuthRouteコンポーネント
 * @param param0 引数
 * @returns 
 */
const UnAuthRoute: React.FC<RouteProps> = ({ ...props }) => {
    
    // 遷移先を制御する。
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/input" element={<Input />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    );
}

export default UnAuthRoute;