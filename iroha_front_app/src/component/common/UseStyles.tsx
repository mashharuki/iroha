/**
 * 共通のスタイルを定義するコンポーネント
 */

import { makeStyles } from '@material-ui/core/styles';

/**
 * UseStylesコンポーネント
 */
const UseStyles =  makeStyles (theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        display: 'table-cell'
    },
    root: {
        flexGrow: 1
    },
    navLink: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
})); 

export default UseStyles