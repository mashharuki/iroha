/**
 * ログイン状態をチェックするコンポーネントファイル
 */

import React, { ReactElement, Component } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Navigate } from 'react-router-dom';

/**
 * ログイン状態をチェックするコンポーネント
 * @param param0 パラメータ
 * @returns アクセス先のページのパスかログイン画面のパス
 
 class PrivateRoute({...props) extends Component {
    constructor(props){
      super(props);
    }
    render(){
      if( true ){
        return( <Route path={this.props.path} component={this.props.component} /> );
      }
      else{
        return( <Navigate to="/login"/> );
      }
    }
  }
export default PrivateRoute;
*/