/**
 * チャージページ用コンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Button, MenuItem, Select } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import UseStyles from "../common/UseStyles";
import superAgent from 'superagent';

// APIサーバーのURL
const baseUrl = process.env.REACT_APP_API_SERVER_URL;
// PrePay選択肢用の配列 
const PrePayItems = [0, 3500, 5000, 14000];
// Counter選択肢用の配列 
const CounterItems = [0, 10, 30, 50];

/**
 * Chargeコンポーネント
 */
function Charge(props:any) {
    // ステート変数
    const [ accountId, setAccoutId ] = useState('')
    const [ domain, setDomain ] = useState('')
    const [ prepay, setPrepay ] = useState(0)
    const [ counter, setCounter ] = useState(0)
    // chargAccoutId用変数
    let chargeAccountId:string = ''
    // chargeDomain用変数
    let chargeDomain:string = '';    
    const location = useLocation();
    // 「取引履歴照会」ボタンを押した時の遷移先と渡す情報
    const ToTxHistory = { 
        accountId: accountId,
        domain: domain,
    };

    /**
     * 副作用フック
     */
     useEffect(() => {
        // 遷移元で入力したアカウントIDとドメインの情報を取得する。
        chargeAccountId = location.state.accountId;
        chargeDomain = location.state.domain;
        // ステート変数をセットする。
        setAccoutId(chargeAccountId);
        setDomain(chargeDomain);
    }, []);

    /**
     * チャージボタンを押した時に実行される関数
     */
    const chargeAction = () => {
        // 合計を計算する。
        let total = counter * prepay;
        // API用のパラメータ変数
        const params = {
            prepay: prepay,
            counter: counter,
            total: total,
            accountId: accountId,
            domain: domain,
        }
        // チャージ用のAPIを呼び出す。
        superAgent
            .get(baseUrl + '/api/charge')
            .query(params) 
            .end((err, res) => {
                if (err) {
                    console.log("チャージ処理用API呼び出し中に失敗", err)
                    return err;
                }
                console.log("チャージ処理用API呼び出し結果：", res);
            });
    }

    return (
        <div className="App">
            <h2>チャージページ</h2>
            <p>対象アカウントID：　{accountId}</p>
            プリペイ残高は 888 です。<br/>
            <FormControl size="medium" sx={{ m: 1, width: 300 }}>
                <InputLabel id="prepay">Prepay</InputLabel>
                <Select
                    labelId="prepay"
                    id="prepay2"
                    value={prepay}
                    label="Prepay"
                    input={<OutlinedInput id="select-prepay" label="Prepay" />}
                    onChange={(e:any) => { setPrepay(e.target.value) }}
                >
                    { PrePayItems.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}円</MenuItem>
                    ))}
                </Select>
            </FormControl><br/>
            回数券残数は 999 です。<br/>
            <FormControl size="medium" sx={{ m: 1, width: 300 }}>
                <InputLabel id="counter">Counter</InputLabel>
                <Select
                    labelId="counter"
                    id="counter2"
                    value={counter}
                    label="counter"
                    input={<OutlinedInput id="select-counter" label="Counter" />}
                    onChange={(e:any) => { setCounter(e.target.value) }}
                >
                    { CounterItems.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}枚セット</MenuItem>
                    ))}
                </Select>
            </FormControl><br/><br/>
            <Button variant="contained" color="secondary" onClick={chargeAction}>
                チャージ実行
            </Button><br/><br/>
            <Button variant="outlined" color="primary">
                <Link to='/txHistory' state={ToTxHistory}>
                    取引履歴照会
                </Link>
            </Button><br/><br/>
            <Link to={{ pathname: '/'}} state={ToTxHistory}>
                メインメニューに戻る
            </Link>
        </div>
    );
}
 
export default Charge