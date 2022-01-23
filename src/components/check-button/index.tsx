import { memo } from 'react';
import { View } from '@tarojs/components';
import { AtIcon } from 'taro-ui';

import styles from './index.module.less';

type Props = {
  className?: string;
  checked: boolean;
  showIcon?: boolean;
};

const CheckButton = memo(
  (props: Props) => {
    const { className = '', checked, showIcon = true } = props;

    return (
      <View data-testid="check-button" className={`${styles['check-button']} ${className}`}>
        <View className={`${styles['css-icon-check']} pos-r ${checked ? '' : styles.hide}`}>
          {showIcon && (
            <AtIcon
              className={`${styles['css-icon-check-white']} pos-r ${checked ? '' : styles.hide}`}
              prefixClass="icon"
              value="check-gou"
              size="10"
              color="#fff"
            />
          )}
        </View>
        <View className={`${styles['css-icon-check-bg']} ${checked ? styles.hide : ''}`} />
      </View>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.checked === nextProps.checked && prevProps.className === nextProps.className;
  },
);

export default CheckButton;
