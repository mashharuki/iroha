/**
 * メインコンポーネントファイル
 */

import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from "./component/pages/Home";
import UseStyles from "./component/common/UseStyles";

function App():ReactElement {
  // スタイルを使用するための変数を用意する。
  const classes = UseStyles();

  return (
    <Router>
      <div className={classes.root}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
