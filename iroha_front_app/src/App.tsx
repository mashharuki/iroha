/**
 * メインコンポーネントファイル
 */

import './App.css';
import AuthUserProvider from './component/pages/common/AuthUserContext';

/**
 * Appコンポーネント
 * @returns AuthUserProviderコンポーネント
 */
function App() {
  return <AuthUserProvider />;
}

export default App;