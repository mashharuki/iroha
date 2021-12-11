/**
 * 支払ページ用コンポーネント
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Button, MenuItem, Select } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Input from '@material-ui/core/Input';
import UseStyles from "../common/UseStyles";

// APIサーバーのURL
const baseUrl = "http://localhost:3001";
// Room選択肢用の配列
const RoomItems = ["フリースペース", "A会議室", "B会議室", "シアター"];
// 人数選択肢用の配列
const PeopleItems = [1, 2, 3, 4, 5];
// 時間選択肢用の配列
const TimeItems = [0.5, 1, 2, 3, 4, 5];

/**
 * Payコンポーネント
 */
function Pay(props:any):ReactElement {
    // ステート変数
    const [ accountId, setAccoutId ] = useState('')
    const [ prepay, setPrepay ] = useState(0)
    const [ counter, setCounter ] = useState(0)
    const [ domain, setDomain ] = useState('')
    const [ room, setRoom ] = useState('')
    const [ people, setPeople ] = useState(0)
    const [ useTime, setUseTime ] = useState(0.0)
    // chargAccoutId用変数
    let payAccountId:string = ''
    // chargeDomain用変数
    let chargeDomain:string = '';   
    const location = useLocation();
    const classes = UseStyles();

    /**
     * 副作用フック
     */
     useEffect(() => {
        // 遷移元で入力したアカウントIDの情報を取得する。
        payAccountId = location.state.accountId;
        chargeDomain = location.state.domain;
        // ステート変数をセットする。
        setAccoutId(payAccountId);
        setDomain(chargeDomain);
        /* ここに、ブロックチェーンからprepayとticket、totalの値を取得する処理を挿入する */
    }, []);

    /**
     * 「支払い」ボタンを押した時に処理する関数
     */
    const payAction = () => {

    }

    return (
        <div className="App">
            <h2>
                支払いページ
            </h2>
            <p>
                対象アカウントID：　{accountId}
            </p>
            <br/>
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                <Grid item>
                    ご利用施設：
                </Grid>
                <Grid item>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="room">ご利用施設名</InputLabel>
                        <Select
                            labelId="room"
                            id="room2"
                            value={room}
                            label="ご利用施設名"
                            input={<OutlinedInput id="select-room" label="ご利用施設名" />}
                            onChange={(e:any) => { setRoom(e.target.value) }}
                        >
                            { RoomItems.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid><br/>
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                <Grid item>
                   人数：
                </Grid>
                <Grid item>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="people">人数</InputLabel>
                        <Select
                            labelId="people"
                            id="people2"
                            value={people}
                            label="人数"
                            input={<OutlinedInput id="select-people" label="人数" />}
                            onChange={(e:any) => { setPeople(e.target.value) }}
                        >
                            { PeopleItems.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}人</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid><br/>
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                <Grid item>
                    ご利用時間：
                </Grid>
                <Grid item>
                    <FormControl  sx={{ m: 1, width: 300 }}>
                        <InputLabel id="useTime">ご利用時間</InputLabel>
                        <Select
                            labelId="useTime"
                            id="useTime2"
                            value={useTime}
                            label="ご利用時間"
                            input={<OutlinedInput id="select-useTime" label="ご利用時間" />}
                            onChange={(e:any) => { setUseTime(e.target.value) }}
                        >
                            { TimeItems.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}時間</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid><br/>
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                <Grid item>
                    プリペイ：
                </Grid>
                <Grid item>
                    <Input id="prepay" className={classes.textField} onChange={(e:any) => { setPrepay(e.target.value) }}/>
                </Grid>
            </Grid><br/>
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                <Grid item>
                    回数券：
                </Grid>
                <Grid item>
                    <Input id="couter" className={classes.textField} onChange={(e:any) => { setCounter(e.target.value) }}/>
                </Grid>
            </Grid> <br/>
            <Button variant="contained" color="secondary" onClick={payAction}>
                支払い実行
            </Button><br/><br/>
            <Link to={{ pathname: '/'}}>
                メインメニューに戻る
            </Link>
        </div>
    );
}
 
export default Pay