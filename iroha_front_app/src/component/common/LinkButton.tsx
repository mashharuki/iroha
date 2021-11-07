/**
 * リンク機能を持たせたボタンのコンポーネント
 */

import { Link } from 'react-router-dom';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface LinkButtonProps extends ButtonProps {
    to: any[];
    replace?: boolean;
    state?: any[];
}

const LinkButton = (props: LinkButtonProps) => (
    <Button {...props} component={Link as any} />
)

 export default LinkButton