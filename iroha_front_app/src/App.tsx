/**
 * メインコンポーネントファイル
 */

import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from "./component/pages/Home";
import Input from './component/pages/Input';
import Pay from './component/pages/Pay';
import Charge from './component/pages/Charge';
import NoPage from './component/pages/NoPage';
import UseStyles from "./component/common/UseStyles";

function App():ReactElement {
  // スタイルを使用するための変数を用意する。
  const classes = UseStyles();

  return (
    <Router>
      <div className={classes.root}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input" element={<Input />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/charge" element={<Charge />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;