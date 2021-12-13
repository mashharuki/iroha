/**
 * アカウントに紐づく取引照会を行う画面のコンポーネントファイル
 */

import React, { useState, useEffect, ReactElement } from "react";
import { Link, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import superAgent from 'superagent';

// APIサーバーのURL
const baseUrl = "http://localhost:3001";

/**
 * 表の列項目用のインターフェース
 */
interface Column {
    id: 'no' | 'id' | 'prepay' | 'ticket' | 'total' | 'shisetsu' | 'ninzu' | 'usetime' | 'job';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

/**
 * 表の最上位ヘッダー部の配列 
 */
const columns: readonly Column[] = [
    { id: 'no', label: 'no', minWidth: 20, align: 'center' },
    { id: 'id', label: 'id', minWidth: 170, align: 'center' },
    { id: 'prepay', label: 'prepay', minWidth: 170, align: 'center', format: (value: number) => value.toLocaleString('utf-8')},
    { id: 'ticket', label: 'ticket', minWidth: 170, align: 'center', format: (value: number) => value.toLocaleString('utf-8')},
    { id: 'total', label: 'total', minWidth: 170, align: 'center', format: (value: number) => value.toLocaleString('utf-8')},
    { id: 'shisetsu', label: 'shisetsu', minWidth: 170, align: 'center' },
    { id: 'ninzu', label: 'ninzu', minWidth: 70, align: 'center', format: (value: number) => value.toLocaleString('utf-8')},
    { id: 'usetime', label: 'usetime', minWidth: 170, align: 'center', format: (value: number) => value.toLocaleString('utf-8')},
    { id: 'job', label: 'job', minWidth: 100, align: 'center' },
];
 
/**
 * TxHistoryコンポーネント
 */
function TxHistory(props:any):ReactElement {
    // ステート変数
    const [ accountId, setAccoutId ] = useState('')
    const [ domain, setDomain ] = useState('')
    const [ txHistories, setTxStories ] = useState([])
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    // chargAccoutId用変数
    let payAccountId:string = ''
    // chargeDomain用変数
    let chargeDomain:string = '';   
    const location = useLocation();

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
        // DBから値を取得する。
        let data = getTxHistories(payAccountId, chargeDomain);
        console.log("取得データ：", data);
        setTxStories(data);
    }, []);

    /**
     * DBから取引履歴情報を取得する関数
     * @param アカウント名
     * @param ドメイン名
     * @returns 
     */
    function getTxHistories(accountId:string, domain:string):any {
        // API用のパラメータ変数
        const params = {
            accountId: accountId,
            domain: domain,
        } 
        // データ取得用のAPIを呼び出す。
        superAgent
            .get(baseUrl + '/api/getTxHistory')
            .query(params) 
            .end((err, res) => {
                if (err) {
                    console.log("支払い処理用API呼び出し中に失敗", err)
                    return err;
                }
                console.log("支払い処理用API呼び出し結果：", res.body["txHistory"]);
                return res.body["txHistory"];
            });
    }

    /**
     * ページングするための関数
     * @param e イベント内容
     * @param newPage 新しいページ
     */
    const handleChangePage = (e: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    /**
     * 1ページに表示する取引履歴の上限を引き上げる関数
     * @param e イベント内容
     */
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    return (
        <div className="App">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 800 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { txHistories
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                {columns.map((column, columnIndex) => {
                                                    // セルに格納する値用の変数
                                                    let value;
                                                    // No以外は、columnの項目と紐付けを行って値をセットする。
                                                    if (column.id == 'no') {
                                                        value = index;
                                                    } else {
                                                        value = row[column.id];
                                                    } 
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={txHistories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Link to={{ pathname: '/'}}>
                ホーム画面に戻る
            </Link>
        </div>
    );
}

export default TxHistory;