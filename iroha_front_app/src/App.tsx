/**
 * メインコンポーネントファイル
 */

import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import UseStyles from "./component/common/UseStyles";
import PrivateRoute from './component/pages/common/PrivateRoute';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import AuthUserProvider, { useAuthUser } from './component/pages/common/AuthUserContext';
import UnAuthRoute from './component/pages/common/UnAuthProvider';

/**
 * Appコンポーネント
 */
function App() {
  // 画面のタイトル用の変数
  const [ title, setTitle ] = useState('Hyperledger Irohaサンプルアプリ');
  // スタイルを使用するための変数を用意する。
  const classes = UseStyles();
  // コンテキストを作成
  let authUser = useAuthUser();
  // ログイン済み確認フラグ
  let isAuthenticated = authUser != null;

  return (
    <Router>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit" component="div">
            {title}
          </Typography>
          { isAuthenticated ? <Button color="inherit">ログアウト</Button> : <></> }
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <AuthUserProvider>
          <PrivateRoute />
        </AuthUserProvider>
      </div>
    </Router>
  );
}

export default App;

// { !isAuthenticated ? <UnAuthRoute /> : <PrivateRoute /> }