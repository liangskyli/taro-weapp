import { useCallback, useState } from 'react';
import { View, Button, Image } from '@tarojs/components';
import { useNavigationBar, useModal, useToast } from 'taro-hooks';
import { useDispatch } from 'react-redux';
import { AtButton } from 'taro-ui';
import { useMultipleTrigger } from '@/utils/hooks';
import logoImg from '@/assets/hook.png';
import type { Columns } from '@/components/table';
import Table from '@/components/table';
import ChangeEnv from './components/change-env';

import styles from './index.module.less';

const Index = () => {
  const dispatch = useDispatch();
  const [, { setTitle }] = useNavigationBar();
  const [isShowChangeEnv, setIsShowChangeEnv] = useState(false);
  const onClickLogo = useMultipleTrigger(() => {
    setIsShowChangeEnv(true);
  }, 6);

  const [show] = useModal({
    title: 'Taro Hooks!',
    showCancel: false,
    confirmColor: '#8c2de9',
    confirmText: '支持一下',
    mask: true,
  });
  const [showToast] = useToast({ mask: true, icon: 'none' });

  const handleModal = useCallback(() => {
    show({ content: '不如给一个star⭐️!' }).then(() => {
      showToast({ title: '点击了支持!' });
    });
  }, [show, showToast]);

  const getAjaxData = async () => {
    const data = await dispatch<any>({
      type: 'index/getList',
      payload: {
        params: { id: 'id' },
      },
    });
    console.log(data);
    const data2 = await dispatch<any>({
      type: 'index/saveData',
      payload: {
        params: { id: 'id' },
        data: { type: 2 },
      },
    });
    console.log(data2);
  };

  const onClose = () => {
    setIsShowChangeEnv(false);
  };

  const columns: Columns = [
    {
      dataIndex: 'name',
      title: 'title',
      align: 'left',
      fixed: true,
    },
    {
      dataIndex: 'name1',
      title: 'title1',
      subTitle: 'subTitle1',
    },
    {
      dataIndex: 'name2',
      title: 'title2',
    },
    {
      dataIndex: 'name3',
      title: 'title3',
    },
    {
      dataIndex: 'name4',
      title: 'title4',
      width: '200rpx',
    },
    {
      dataIndex: 'name5',
      title: 'title5',
      width: '200rpx',
    },
  ];
  const dataSource = [
    {
      name: '合计',
      name1: '10',
      name2: '20',
      name3: '30',
      name4: '400',
      name5: '500',
    },
    {
      name: '类别',
      name1: '101',
      name2: '20',
      name3: '30',
      name4: '400',
      name5: '500',
      children: [
        {
          name: '类别1',
          name1: '102',
          name2: '20',
          name3: '30',
          name4: '400',
          name5: '500',
        },
        {
          name: '类别2',
          name1: '103',
          name2: '20',
          name3: '30',
          name4: '400',
          name5: '500',
        },
      ],
    },
  ];

  return (
    <View className={`${styles.wrapper} safe-bottom`}>
      <Image className={styles.logo} src={logoImg} onClick={onClickLogo} />
      <ChangeEnv isOpen={isShowChangeEnv} onClose={onClose} />
      <Button className={styles.button} onClick={() => setTitle('Taro Hooks Nice!')}>
        设置标题
      </Button>
      <Button className={styles.button} onClick={handleModal}>
        使用Modal
      </Button>
      <AtButton className={styles.button} onClick={getAjaxData}>
        taro ui button
      </AtButton>
      <Table columns={columns} dataSource={dataSource} />
    </View>
  );
};

export default Index;
