/**
 * 新規アカウント登録コンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import Input2 from '@material-ui/core/Input';
import UseStyles from "../common/UseStyles";

function Input():ReactElement {
    // ステート変数
    const [ accountId, setAccoutId ] = useState('')
    const [ name, setName ] = useState('')
    const [ kana, setKana ] = useState('')
    const [ adds, setAdds ] = useState('')
    const [ tel, setTel ] = useState('')
    const [ bd, setBd ] = useState('')
    const classes = UseStyles()

    return (
        <div className="App">
            <h2>
                新規会員登録ページ
            </h2>
            <br/>
            <br/>
            アカウント：
            <Input2
                id="accountId" 
                value={accountId} 
                className={classes.textField}
                onChange={ (e:any) => setAccoutId(e.target.value) } 
            />
            <br/>
            名前：
            <Input2
                id="name" 
                value={name} 
                className={classes.textField}
                onChange={ (e:any) => setName(e.target.value) } 
            /><br/>
            かな：
            <Input2
                id="kana" 
                value={kana} 
                className={classes.textField}
                onChange={ (e:any) => setKana(e.target.value) } 
            /><br/>
            住所：
            <Input2
                id="adds" 
                value={adds} 
                className={classes.textField}
                onChange={ (e:any) => setAdds(e.target.value) } 
            /><br/>
            電話：
            <Input2
                id="tel" 
                value={tel} 
                className={classes.textField}
                onChange={ (e:any) => setTel(e.target.value) } 
            /><br/>
            誕生日：
            <Input2
                id="bd" 
                value={bd} 
                className={classes.textField}
                onChange={ (e:any) => setBd(e.target.value) } 
            /><br/><br/>
            <Button variant="contained" color="secondary">
                登録
            </Button>
            <br/>
            <br/>
            <Link to={{ pathname: '/'}}>
                メインメニューに戻る
            </Link>
        </div>
    );
}

export default Input