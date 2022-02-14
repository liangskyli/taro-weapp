import { View } from '@tarojs/components';
import { Button, Toast } from '@taroify/core';
import Taro from '@tarojs/taro';

const Index = () => {
  const showToast = () => {
    Toast.open('toast');
  };
  const goPackage1Index = () => {
    Taro.navigateTo({ url: '/subpackages/package1/pages/index/index' });
  };

  return (
    <>
      <View>second</View>
      <Button onClick={showToast} block>
        toast
      </Button>
      <Button onClick={goPackage1Index} block>
        go package1-index
      </Button>
    </>
  );
};

export default Index;
