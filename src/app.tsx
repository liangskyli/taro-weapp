import { Provider } from 'react-redux';
import { Current } from '@tarojs/taro';
import { Dialog, Notify, SafeArea, Toast } from '@taroify/core';
import { $ } from '@tarojs/extend';
import { render } from 'react-dom';
import store from '@/store';

import './app.less';

const App = (props: any) => {
  if (props.children.length > 0) {
    setTimeout(() => {
      // 页面加入全局组件
      const path = (Current.page as any).$taroPath;
      const page = document.getElementById(path);
      const globalDivWrap = $(page).find('#global-div-wrap');
      if (!globalDivWrap.length) {
        const globalDiv = document.createElement('div');
        globalDiv.id = 'global-div-wrap';
        render(
          <>
            <SafeArea id="safe-area-bottom" position="bottom" />
            <Toast id="toast" />
            <Dialog id="dialog" />
            <Notify id="notify" />
          </>,
          globalDiv,
        );
        $(page).append(globalDiv);
        Toast.setDefaultOptions({ duration: 3000 });
        Dialog.setDefaultOptions({ backdrop: { closeable: false } });
      }
    }, 0);
  }
  return <Provider store={store}>{props.children}</Provider>;
};

export default App;
