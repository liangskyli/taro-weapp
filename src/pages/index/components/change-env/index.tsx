import type { EnvEnumType } from '@/config';
import { useState } from 'react';
import { View } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import type { SidePopUpProps } from '@/components/side-pop-up';
import SidePopUp from '@/components/side-pop-up';
import { EnvEnum } from '@/config';

const envOptions: SidePopUpProps<EnvEnumType>['list'] = [
  { name: '开发环境', id: '0' },
  { name: '测试环境', id: '1' },
  { name: '预发布环境', id: '2' },
  { name: '生产环境', id: '3' },
];

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
}
const ChangeEnv = (props: PropsType) => {
  const { isOpen, onClose } = props;

  const { envEnum } = useSelector((state: any) => state.global);

  const [selectedId, setSelectedId] = useState(envEnum);

  const dispatch = useDispatch();
  const onClickEnv = (value) => {
    dispatch({
      type: 'global/setEnvEnum',
      payload: value,
    });
    setSelectedId(value);
    onClose();
  };

  const onSidePopUpClose = () => {
    onClose();
  };

  return (
    <>
      {EnvEnum[selectedId] !== 'prod' && (
        <View className="txt-center">接口环境：{EnvEnum[selectedId]}</View>
      )}
      <SidePopUp<string>
        title="请选择环境"
        isOpen={isOpen}
        closePopUp={onSidePopUpClose}
        list={envOptions}
        selectedId={selectedId}
        onSelectedClick={(item) => onClickEnv(item.id)}
      />
    </>
  );
};

export default ChangeEnv;
