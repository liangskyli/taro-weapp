// @ts-ignore
import React from 'react';

jest.mock('taro-ui', () => {
  const originalModule = jest.requireActual('taro-ui');
  return {
    ...originalModule,
    AtDrawer: (props: any) => {
      return (
        <div>
          <div data-testid="taro-ui-AtDrawer">AtDrawer:show:{props.show ? 'true' : 'false'}</div>
          <div data-testid="antd-mobile-popup-content">{props.children}</div>
        </div>
      );
    },
  };
});
