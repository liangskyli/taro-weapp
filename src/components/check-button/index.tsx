import { memo } from 'react';
import { View } from '@tarojs/components';
import Icon from '@/components/icon';

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
            <Icon
              className={`${styles['css-icon-check-white']} pos-r ${checked ? '' : styles.hide}`}
              name="check-gou"
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
