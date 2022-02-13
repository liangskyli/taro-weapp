import { View } from '@tarojs/components';
import { Button, Toast } from '@taroify/core';

const Index = () => {
  const showToast = () => {
    Toast.open('toast');
  };

  return (
    <>
      <View>second</View>
      <Button onClick={showToast}>toast</Button>
    </>
  );
};

export default Index;
