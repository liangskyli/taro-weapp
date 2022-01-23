import { Provider } from 'react-redux';
import store from '@/store';

import 'taro-ui/dist/style/index.scss';
import './app.less';

const App = (props: any) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default App;
