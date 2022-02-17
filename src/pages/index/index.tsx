import { useCallback, useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { useNavigationBar, useModal } from 'taro-hooks';
import { useDispatch } from 'react-redux';
import { Button, Dialog, Notify, Toast } from '@taroify/core';
import Taro, { redirectTo } from '@tarojs/taro';
import { useMultipleTrigger } from '@/utils/hooks';
import { addUrlParams } from '@/utils/common';
import logoImg from '@/assets/hook.png';
import type { Columns } from '@/components/table';
import Table from '@/components/table';
import type { F2CanvasProps } from '@/components/f2-canvas';
import F2Canvas from '@/components/f2-canvas';
import type { LegendItem } from '@antv/f2/types/Legend';
import type { Chart, DataRecord, GuideResult, GuideTextParams } from '@antv/f2';
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

  const handleModal = useCallback(() => {
    show({ content: '不如给一个star⭐️!' }).then(() => {
      Toast.open('点击了支持!');
    });
  }, [show]);

  const handleModal2 = () => {
    Dialog.alert({
      message: 'taroify alert',
      onConfirm: () => {
        Notify.open('点击了确定!');
      },
    });
  };

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
    });
  };

  const goWebView = () => {
    redirectToWebview('https://www.baidu.com/', { hideHomeButton: '0' });
  };

  const goSecondPage = () => {
    Taro.navigateTo({
      url: '/pages/second/index',
    });
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

  const chartInteraction = (
    chart: Chart<DataRecord>,
    assetTypeText: GuideResult<GuideTextParams>,
    percentText: GuideResult<GuideTextParams>,
    item?: { assetType: string; percent: number },
  ) => {
    chart.interaction('pie-select', {
      offset: -1,
      style: { fillOpacity: 1 },
      defaultSelected: item
        ? {
            assetType: item.assetType,
            percent: item.percent,
            const: 'const',
          }
        : undefined,

      onEnd: (ev) => {
        const { data, selected } = ev;
        if (data) {
          if (selected) {
            assetTypeText.content = data.assetType;
            percentText.content = data.percent + '%';
          } else {
            assetTypeText.content = 'title1';
            percentText.content = 'title2';
          }
          assetTypeText.repaint();
          percentText.repaint();
        }
      },
    });
  };
  /*const findLegendItem = (legendItems,name) => {
    let index = -1;
    for (let i = 0; i < legendItems.length; i++) {
      if (legendItems[i].name === name) {
        index = i;
        break;
      }
    }
    return index;
  };*/

  const initChart: F2CanvasProps['onInit'] = (F2, config) => {
    const colorMap = {
      债券资产1: '#1890FF',
      其他资产: '#2FC25B',
      股票资产: '#FACC14',
      现金资产: '#F04864',
    };
    //config.plugins = [PieLabel];
    const chart = new F2.Chart(config);
    const data = [
      {
        assetType: '债券资产1',
        percent: 73.76,
        const: 'const',
      },
      {
        assetType: '其他资产',
        percent: 22.11,
        const: 'const',
      },
      {
        assetType: '股票资产',
        percent: 2.2,
        const: 'const',
      },
      {
        assetType: '现金资产',
        percent: 1.93,
        const: 'const',
      },
    ];
    // 设置图例项的内容
    const legendItems: LegendItem[] = [];
    data.forEach(function (obj) {
      const item: LegendItem = {
        name: obj.assetType,
        dataValue: obj.percent,
        value: obj.percent + '%',
        marker: {
          symbol: 'square',
          fill: colorMap[obj.assetType],
          radius: 4,
        },
      };
      legendItems.push(item);
    });

    chart.source(data, {
      percent: {
        formatter: (val) => {
          return val + '%';
        },
      },
    });
    chart.legend({
      position: 'right',
      custom: true,
      items: legendItems,
      nameStyle: {
        fill: '#808080',
        width: 60,
      },
      valueStyle: {
        fill: '#333',
        fontWeight: 'bold',
      },
      joinString: '',
      onClick: (ev) => {
        const item = ev.clickedItem;

        const assetType = item.get('name');
        const percent = item.get('dataValue');
        /*const checked = item.get('checked');
        item.set('checked', !checked);
        legendItems[findLegendItem(legendItems, assetType)].checked = !checked;*/

        assetTypeText.content = assetType;
        assetTypeText.repaint();
        percentText.content = item.get('value');
        percentText.repaint();
        //(chart as any).clearInteraction('pie-select');
        chart.repaint();
        chartInteraction(chart, assetTypeText, percentText, { assetType, percent });
      },
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.6,
      radius: 0.85,
    });
    chart.axis(false);
    const assetTypeText = chart.guide().text({
      position: ['50%', '46%'],
      content: 'title1',
      style: { fontSize: 12 },
    });
    const percentText = chart.guide().text({
      position: ['50%', '56%'],
      content: 'title2',
      style: { fontSize: 12 },
    });
    chart
      .interval()
      .position('const*percent')
      .color('assetType', function (val) {
        return colorMap[val];
      })
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });
    chartInteraction(chart, assetTypeText, percentText);
    chart.render();
    return chart;
  };

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
        <Button className={styles.button} onClick={handleModal2}>
          使用 taroify Modal
        </Button>
        <Button className={styles.button} onClick={getAjaxData}>
          taroify button
        </Button>
        <View>
          <F2Canvas
            style={{ width: '100%', height: '200px' }}
            onInit={(F2, config) => initChart(F2, config)}
          />
        </View>
        <Table columns={columns} dataSource={dataSource} />
        <Button className={styles.button} onClick={goWebView}>
          go webview
        </Button>
        <Button className={styles.button} onClick={goSecondPage}>
          second page
        </Button>
      </View>
    </>
  );
};

export default Index;
