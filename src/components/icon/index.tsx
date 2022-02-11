import { View } from '@tarojs/components';
import type { ViewProps } from '@tarojs/components/types/View';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import { addUnitPx } from '@taroify/icons/utils/unit';

interface VanIconProps extends ViewProps {
  /** className 前缀，用于第三方字体图标库 */
  prefixClass?: string;
  className?: string;
  style?: CSSProperties;
  /** 图标图案 */
  name: string;
  /** 图标大小 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
}

const Icon = (props: VanIconProps) => {
  const {
    prefixClass = 'icon',
    className,
    style,
    name,
    size = 'inherit',
    color = 'inherit',
    ...restProps
  } = props;

  return (
    <View
      data-testid="icon"
      className={classNames('inline-block', prefixClass, `${prefixClass}-${name}`, className)}
      style={{
        color: color,
        fontSize: addUnitPx(size),
        ...style,
      }}
      {...restProps}
    />
  );
};
export default Icon;
