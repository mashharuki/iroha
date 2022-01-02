/**
 * メインコンポーネントファイル
 */

import React, { ReactElement, Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Home from "./component/pages/Home";
import Input from './component/pages/Input';
import Pay from './component/pages/Pay';
import Charge from './component/pages/Charge';
import NoPage from './component/pages/NoPage';
import TxHistory from './component/pages/TxHistory';
import UseStyles from "./component/common/UseStyles";
import Login from './component/pages/Login';
import UnAuthRoute from './component/pages/common/UnAuthProvider';
import PrivateRoute from './component/pages/common/PrivateRoute';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import AuthUserProvider from './component/pages/common/AuthUserContext';

/**
 * Appコンポーネント
 */
function App() {
  // スタイルを使用するための変数を用意する。
  const classes = UseStyles();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit" component="div">
            Hyperledger Irohaサンプルアプリ
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
