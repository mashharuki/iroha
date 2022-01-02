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
import AuthUserProvider from './component/pages/common/AuthUserContext';

/**
 * Appコンポーネント
 */
function App() {
  // 画面のタイトル用の変数
  const [ title, setTitle ] = useState('Hyperledger Irohaサンプルアプリ');
  // スタイルを使用するための変数を用意する。
  const classes = UseStyles();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit" component="div">
            {title}
          </Typography>
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
