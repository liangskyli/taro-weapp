import { ScrollView, View } from '@tarojs/components';
import { AtDrawer, AtIcon, AtList } from 'taro-ui';
import CheckButton from '@/components/check-button';

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
    children,
  } = props;

  return (
    <AtDrawer
      className={`${styles['side-pop-up']} ${className}`}
      show={isOpen}
      onClose={closePopUp}
      right
    >
      <View className={`${styles.head} ${styles.box}`}>
        <View data-testid="title" className="fz28 color-888">
          {title}
        </View>
        <AtIcon prefixClass="icon" value="close" size="20" color="#666" onClick={closePopUp} />
      </View>
      <ScrollView data-testid="scroll-view" className={styles['list-scroll-area']} scrollY>
        <View className="safe-bottom">
          {list ? (
            <>
              <AtList className={styles.list}>
                {list.map((item, index) => {
                  return (
                    <View
                      key={item.id as any}
                      data-testid={`AtList-item-${item.id}`}
                      className={`${styles.item} ${index === list.length - 1 ? 'border-b' : ''}`}
                      hoverClass={styles['item-hover']}
                      onClick={() => onSelectedClick?.(item)}
                    >
                      <View
                        data-testid={`AtList-item-box-${item.id}`}
                        className={`${styles.box} ${index === list.length - 1 ? '' : 'border-b'}`}
                      >
                        <View className="fz32">{item.name}</View>
                        <CheckButton checked={selectedId === item.id} />
                      </View>
                    </View>
                  );
                })}
              </AtList>
            </>
          ) : (
            children
          )}
        </View>
      </ScrollView>
    </AtDrawer>
  );
};
export default SidePopUp;
