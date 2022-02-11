import { ScrollView, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Icon from '@/components/icon';

import styles from './index.module.less';

type Column = {
  dataIndex: string;
  title: string;
  subTitle?: string;
  width?: string;
  align?: 'left' | 'right' | 'center';
  render?: (text, record) => JSX.Element;
  /* 列是否固定，目前只支持第一列 */
  fixed?: boolean;
};
export type Columns = Column[];

type DataSourceItem = {
  /* 是否折叠（只支持一级折叠结构） */
  isFold?: boolean;
  /* 子项数据 */
  children?: Omit<DataSourceItem, 'children' | 'isFold'>[];
  [key: string]: any;
};

export type SidePopUpProps = {
  columns: Columns;
  dataSource: DataSourceItem[];
  className?: string;
};
const Table: (props: SidePopUpProps) => JSX.Element = (props) => {
  const { columns, dataSource: initDataSource, className = '' } = props;

  const [dataSource, setDataSource] = useState(initDataSource);

  useEffect(() => {
    setDataSource(initDataSource);
  }, [initDataSource]);

  const onCollapse = (item: DataSourceItem) => {
    item.isFold = !item.isFold;
    setDataSource([...dataSource]);
  };

  const haveChildren = (item: DataSourceItem) => {
    let have = false;
    if (item.children && item.children.length > 0) {
      have = true;
    }
    return have;
  };

  const renderColumn = (item: DataSourceItem, column: Column, columnIndex: number) => {
    let html = <>{item[column.dataIndex]}</>;
    if (column.render) {
      html = column.render(item[column.dataIndex], item);
    } else {
      if (haveChildren(item) && columnIndex === 0) {
        html = (
          <View className={styles['item-first']}>
            {item.isFold ? (
              <Icon
                className={`${styles['sanjiao-icon']} pos-a`}
                name="sanjiao_zhankai"
                size="12"
                color="#666"
              />
            ) : (
              <Icon
                className={`${styles['sanjiao-icon']} pos-a`}
                name="sanjiao_shouqi"
                size="12"
                color="#666"
              />
            )}
            <view>{item[column.dataIndex]}</view>
          </View>
        );
      }
    }
    return html;
  };

  return (
    <ScrollView className={styles['scroll-area']} scrollX>
      <View className={`${styles.table} ${className}`}>
        <View className={styles.wrap}>
          <View className={styles.head}>
            {columns.map((item) => {
              return (
                <View
                  className={`${styles.item} ${item.subTitle ? styles['item-has-sub'] : ''} ${
                    item.fixed ? styles['item-fixed'] : ''
                  } `}
                  key={item.dataIndex}
                  style={{
                    justifyContent: item.align,
                    width: item.width,
                  }}
                >
                  <View>{item.title}</View>
                  {item.subTitle && <View>{item.subTitle}</View>}
                </View>
              );
            })}
          </View>
        </View>
        <View className={styles.wrap}>
          <View className={styles.content}>
            {dataSource.map((item, index) => {
              return (
                <>
                  <View
                    data-testid={`${index}-content-onCollapse`}
                    className={`${styles.row} border-b ${
                      haveChildren(item) ? styles['row-bg'] : ''
                    }`}
                    key={index}
                    onClick={haveChildren(item) ? () => onCollapse(item) : undefined}
                  >
                    {columns.map((column, columnIndex) => {
                      return (
                        <View
                          data-testid={`${index}-${columnIndex}-content`}
                          className={`${styles.item} ${column.fixed ? styles['item-fixed'] : ''} `}
                          key={column.dataIndex}
                          style={{
                            justifyContent: column.align,
                            width: column.width,
                          }}
                        >
                          {renderColumn(item, column, columnIndex)}
                        </View>
                      );
                    })}
                  </View>
                  {haveChildren(item) && !item.isFold && (
                    <>
                      {item.children!.map((childrenItem, childrenIndex) => {
                        return (
                          <View className={`${styles.row} border-b`} key={childrenIndex}>
                            {columns.map((column, columnIndex) => {
                              return (
                                <View
                                  data-testid={`${index}-${columnIndex}-${childrenIndex}-content-children`}
                                  className={`${styles.item} ${
                                    column.fixed ? styles['item-fixed'] : ''
                                  } `}
                                  key={column.dataIndex}
                                  style={{
                                    justifyContent: column.align,
                                    width: column.width,
                                  }}
                                >
                                  {renderColumn(childrenItem, column, columnIndex)}
                                </View>
                              );
                            })}
                          </View>
                        );
                      })}
                    </>
                  )}
                </>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Table;
