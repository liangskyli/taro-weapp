import type { EnvEnumType } from '@/config';
import { useState } from 'react';
import { View } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import type { SidePopUpProps } from '@/components/side-pop-up';
import SidePopUp from '@/components/side-pop-up';

const envOptions: SidePopUpProps<EnvEnumType>['list'] = [
  { name: '开发环境', id: 'dev' },
  { name: '测试环境', id: 'test' },
  { name: '预发布环境', id: 'release' },
  { name: '生产环境', id: 'prod' },
];

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
}
const ChangeEnv = (props: PropsType) => {
  const { isOpen, onClose } = props;

  const { envEnum } = useSelector((state: any) => state.global);

  const [selectedId, setSelectedId] = useState<EnvEnumType>(envEnum);

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
      {selectedId !== 'prod' && <View className="txt-center">接口环境：{selectedId}</View>}
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
