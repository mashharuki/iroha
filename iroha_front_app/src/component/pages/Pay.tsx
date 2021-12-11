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

/**
 * Payコンポーネント
 */
function Pay(props:any):ReactElement {
    // ステート変数
    const [ accountId, setAccoutId ] = useState('')
    const [ room, setRoom ] = useState('')
    const [ people, setPeople ] = useState(0)
    const [ useTime, setUseTime ] = useState(0.0)
    // chargAccoutId用変数
    let payAccountId:string = ''
    const location = useLocation();
    const classes = UseStyles();

    /**
     * 副作用フック
     */
     useEffect(() => {
        // 遷移元で入力したアカウントIDの情報を取得する。
        payAccountId = location.state.accountId;
        // ステート変数をセットする。
        setAccoutId(payAccountId)
    }, []);

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
                            <MenuItem value="フリースペース">フリースペース</MenuItem>
                            <MenuItem value="A会議室">A会議室</MenuItem>
                            <MenuItem value="B会議室">B会議室</MenuItem>
                            <MenuItem value="シアター">シアター</MenuItem>
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
                            <MenuItem value="1">1人</MenuItem>
                            <MenuItem value="2">2人</MenuItem>
                            <MenuItem value="3">3人</MenuItem>
                            <MenuItem value="4">4人</MenuItem>
                            <MenuItem value="5">5人</MenuItem>
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
                            <MenuItem value="0.5">30分</MenuItem>
                            <MenuItem value="1">1時間</MenuItem>
                            <MenuItem value="2">2時間</MenuItem>
                            <MenuItem value="3">3時間</MenuItem>
                            <MenuItem value="4">4時間</MenuItem>
                            <MenuItem value="5">5時間</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid><br/>
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                <Grid item>
                    プリペイ：
                </Grid>
                <Grid item>
                    <Input id="prepay" className={classes.textField} />
                </Grid>
            </Grid><br/>
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                <Grid item>
                    回数券：
                </Grid>
                <Grid item>
                    <Input id="couter" className={classes.textField}/>
                </Grid>
            </Grid> <br/>
            <Button variant="contained" color="secondary">
                支払い実行
            </Button><br/><br/>
            <Link to={{ pathname: '/'}}>
                メインメニューに戻る
            </Link>
        </div>
    );
}
 
export default Pay