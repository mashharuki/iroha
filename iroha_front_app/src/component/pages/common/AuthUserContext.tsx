/**
 * 権限情報を管理するコンポーネントをまとめるファイル
 */

import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import UseStyles from "./../../common/UseStyles";
import AppBar  from '@mui/material/AppBar';
import Toolbar  from '@mui/material/Toolbar';
import Typography  from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
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
 * @returns AppBer + UnAuthRoute or PrivateRoute コンポーネント
 */
const AuthUserProvider: React.FC = ({ children }) => {
    // 画面のタイトル用の変数
    const [ title, setTitle ] = useState('Hyperledger Irohaサンプルアプリ');
    const [authUser, setAuthUser] = useState<AuthUser | null>(null)
    // スタイルを使用するための変数を用意する。
    const classes = UseStyles();
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
        setAuthUser(null);
        return <Navigate to="/login"/>;
    }

    return (
        <AuthOperationContext.Provider value={{login, logout}}>
            <AuthUserContext.Provider value={authUser}>
                <Router>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                <Typography variant="h5" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                                    {title}
                                </Typography>
                                { isAuthenticated ? <Button color="inherit" onClick={logout}>ログアウト</Button> : <></> }
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <div className={classes.root}>
                        { !isAuthenticated ? <UnAuthRoute /> : <PrivateRoute /> }
                    </div>
                </Router>   
            </AuthUserContext.Provider>
        </AuthOperationContext.Provider>
    )
}

export const useAuthUser = () => useContext(AuthUserContext)
export const useLogin = () => useContext(AuthOperationContext).login
export const useLogout = () => useContext(AuthOperationContext).logout

export default AuthUserProvider