/**
 * 権限情報を管理するコンポーネントをまとめるファイル
 */

import React, { createContext, useContext, useState } from "react";
import AuthUser from "./models/auth";
import PrivateRoute from './PrivateRoute';
import UnAuthRoute from './UnAuthProvider';

// 関数のタイプを宣言する。
type OperationType = {
    login: (userId: string) => void
    logout: () => void
}

// コンテキストの定義
const AuthUserContext = createContext<AuthUser | null>(null);
const AuthOperationContext = createContext<OperationType>({
    login: (_) => console.error("Providerが設定されていません"),
    logout: () => console.error("Providerが設定されていません")
})

/**
 * AuthUserProviderコンポーネント
 * @param param0 Reactコンポーネント
 * @returns 
 */
const AuthUserProvider: React.FC = ({ children }) => {
    // ステート変数
    const [authUser, setAuthUser] = useState<AuthUser | null>(null)
    // ログイン済み確認フラグ
    let isAuthenticated = authUser != null;

    // ログイン関数
    const login = async (userId: string) => {
        // await login() //ログイン処理
        setAuthUser({ userId })
    }
    
    // ログアウト関数
    const logout = async () => {
        // await login() //ログアウト処理
        setAuthUser(null)
    }

    return (
        <AuthOperationContext.Provider value={{login, logout}}>
            <AuthUserContext.Provider value={authUser}>
                { !isAuthenticated ? <UnAuthRoute /> : <PrivateRoute /> }
            </AuthUserContext.Provider>
        </AuthOperationContext.Provider>
    )
}

export const useAuthUser = () => useContext(AuthUserContext)
export const useLogin = () => useContext(AuthOperationContext).login
export const useLogout = () => useContext(AuthOperationContext).logout

export default AuthUserProvider