import { ScrollView, View } from '@tarojs/components';
import { Cell, SafeArea, Popup } from '@taroify/core';
import CheckButton from '@/components/check-button';
import Icon from '@/components/icon';

import styles from './index.module.less';

type Item<T> = { name: string; id: T };

export type SidePopUpProps<T = string> = {
  title?: string;
  selectedId?: T;
  list?: Item<T>[];
  isOpen: boolean;
  onSelectedClick?: (item: Item<T>) => void;
  closePopUp: () => void;
  className?: string;
  isMaskClose?: boolean;
  children?: JSX.Element;
};
const SidePopUp: <T>(props: SidePopUpProps<T>) => JSX.Element = (props) => {
  const {
    title = '请选择',
    isOpen,
    list,
    selectedId,
    closePopUp,
    onSelectedClick,
    className = '',
    isMaskClose = true,
    children,
  } = props;

  return (
    <Popup
      className={`${styles['side-pop-up']} ${className}`}
      open={isOpen}
      onClose={closePopUp}
      placement="right"
    >
      <Popup.Backdrop closeable={isMaskClose} />
      <View className={`${styles.head} ${styles.box}`}>
        <View data-testid="title" className="fz28 color-888">
          {title}
        </View>
        <Icon name="close" size="20" color="#666" onClick={closePopUp} />
      </View>
      <ScrollView data-testid="scroll-view" className={styles['list-scroll-area']} scrollY>
        <>
          {list ? (
            <>
              <View className={styles.list}>
                {list.map((item) => {
                  return (
                    <Cell
                      key={item.id as any}
                      data-testid={`list-item-${item.id}`}
                      className={`${styles.item}`}
                      clickable
                      onClick={() => onSelectedClick?.(item)}
                    >
                      <View className={styles.box}>
                        <View className="fz32">{item.name}</View>
                        <CheckButton checked={selectedId === item.id} />
                      </View>
                    </Cell>
                  );
                })}
              </View>
            </>
          ) : (
            children
          )}
          <SafeArea position="bottom" />
        </>
      </ScrollView>
    </Popup>
  );
};
export default SidePopUp;
