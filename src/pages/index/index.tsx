import { useCallback, useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { useNavigationBar, useModal, useToast } from 'taro-hooks';
import { useDispatch } from 'react-redux';
import { Button, SafeArea } from '@taroify/core';
import Taro, { redirectTo } from '@tarojs/taro';
import { useMultipleTrigger } from '@/utils/hooks';
import { addUrlParams } from '@/utils/common';
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

  const redirectToWebview = (url: string, params?: { hideHomeButton?: '0' | '1' }) => {
    redirectTo({
      url: addUrlParams('/pages/web-view/index', { url, ...params }),
      fail(err) {
        console.error('跳转webview失败', err);
      },
    });
  };

  const goWebView = () => {
    redirectToWebview('https://www.baidu.com/', { hideHomeButton: '1' });
  };

  useEffect(() => {
    try {
      const params = Taro.getStorageSync('webviewParams');

      if (params) {
        const webviewUrl = decodeURIComponent(params.url || '');
        if (webviewUrl) {
          const expireTimeStamp = 1000 * 10;
          if (+new Date() - params.time < expireTimeStamp) {
            redirectToWebview(webviewUrl, { hideHomeButton: params.hideHomeButton });
          } else {
            Taro.removeStorageSync('webviewParams');
          }
        }
      }
    } catch (e) {
      // Do something when catch error
    }
  }, []);

  return (
    <>
      <View className={styles.wrapper}>
        <Image className={styles.logo} src={logoImg} onClick={onClickLogo} />
        <ChangeEnv isOpen={isShowChangeEnv} onClose={onClose} />
        <Button
          className={styles.button}
          color="primary"
          onClick={() => setTitle('Taro Hooks Nice!')}
        >
          设置标题
        </Button>
        <Button className={styles.button} onClick={handleModal}>
          使用Modal
        </Button>
        <Button className={styles.button} onClick={getAjaxData}>
          taroify button
        </Button>
        <Table columns={columns} dataSource={dataSource} />
        <Button className={styles.button} onClick={goWebView}>
          go webview
        </Button>
      </View>
      <SafeArea position="bottom" />
    </>
  );
};

export default Index;
