/**
 * チャージページ用コンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Button, MenuItem,  FormControl, Select, InputLabel } from "@material-ui/core";
import UseStyles from "../common/UseStyles";

/**
 * Chargeコンポーネント
 */
function Charge(props:any):ReactElement {
    // ステート変数
    const [ accountId, setAccoutId ] = useState('')
    const [ prepay, setPrepay ] = useState(0)
    const [ counter, setCounter ] = useState(0)
    // chargAccoutId用変数
    let chargeAccountId:string = ''
    const location = useLocation();

    /**
     * 副作用フック
     */
     useEffect(() => {
        console.log("props:", location)
        // 遷移元で入力したアカウントIDの情報を取得する。
        chargeAccountId = location.state.accountId;
        // ステート変数をセットする。
        setAccoutId(chargeAccountId)
    }, []);

    return (
        <div className="App">
            <h2>
                チャージページ
            </h2>
            <p>
                対象アカウントID：　{accountId}
            </p>
            プリペイ残高は 888 です。<br/>
            <FormControl size="medium">
                <InputLabel id="prepay">Prepay</InputLabel>
                <Select
                    labelId="prepay"
                    id="prepay2"
                    value={prepay}
                    label="Prepay"
                    onChange={(e:any) => { setPrepay(e.target.value) }}
                >
                    <MenuItem value={0}>なし</MenuItem>
                    <MenuItem value={3500}>3500円</MenuItem>
                    <MenuItem value={6000}>5000円</MenuItem>
                    <MenuItem value={14000}>10000円</MenuItem>
                </Select>
            </FormControl><br/>
            回数券残数は 999 です。<br/>
            <FormControl size="medium">
                <InputLabel id="counter">Counter</InputLabel>
                <Select
                    labelId="counter"
                    id="counter2"
                    value={counter}
                    label="counter"
                    onChange={(e:any) => { setCounter(e.target.value) }}
                >
                    <MenuItem value={0}>なし</MenuItem>
                    <MenuItem value={11}>10枚セット</MenuItem>
                    <MenuItem value={35}>30枚セット</MenuItem>
                    <MenuItem value={50}>50枚セット</MenuItem>
                </Select>
            </FormControl><br/><br/>
            <Button variant="contained" color="secondary">
                チャージ実行
            </Button><br/><br/>
            <Link to={{ pathname: '/'}}>
                メインメニューに戻る
            </Link>
        </div>
    );
}
 
export default Charge