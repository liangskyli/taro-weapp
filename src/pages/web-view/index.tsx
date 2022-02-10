import { useEffect, useState } from 'react';
import { useRouter } from 'taro-hooks';
import { WebView } from '@tarojs/components';
import Taro from '@tarojs/taro';

const Index = () => {
  // 获得页面传入参数
  const [{ params }] = useRouter();
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (params.hideHomeButton == '1') {
      Taro.hideHomeButton();
    }
    const webviewUrl = decodeURIComponent(params.url || '');
    setUrl(webviewUrl);
    Taro.setStorageSync('webviewParams', { ...params, time: +new Date() });
  }, [params]);

  const onMessage = ({ detail: { data } }) => {
    console.log('webview onMessage', data);
  };
  const onLoad = (e: any) => {
    console.log('webview onLoad', e);
  };
  const onError = (e: any) => {
    console.error('webview onLoad', e);
  };

  return <WebView src={url} onMessage={onMessage} onLoad={onLoad} onError={onError} />;
};

export default Index;
