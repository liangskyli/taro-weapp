import { render } from '@testing-library/react';
import SidePopUp from '@/components/side-pop-up/index';

describe('测试 side-pop-up 组件', () => {
  let selectedId: any = '';
  let isOpen = false;
  const pageHouseTypeList = [
    {
      id: 1,
      name: 'name1',
    },
    {
      id: 2,
      name: 'name2',
    },
    {
      id: 3,
      name: 'name3',
    },
  ];
  const closePopUp = () => {
    isOpen = false;
  };
  const onSelectedClick = (item: any) => {
    if (selectedId !== item.id) {
      selectedId = item.id;
    }
    isOpen = false;
  };

  beforeEach(() => {
    selectedId = 1;
    isOpen = true;
  });

  test('side-pop-up 组件 默认"', () => {
    const wrapper = render(
      <SidePopUp
        selectedId={selectedId}
        list={pageHouseTypeList}
        isOpen={isOpen}
        closePopUp={closePopUp}
        onSelectedClick={onSelectedClick}
      />,
    );
    expect(wrapper.getByTestId('taro-ui-AtDrawer').textContent).toBe('AtDrawer:show:true');
    expect(wrapper.getByTestId('title').textContent).toBe('请选择');
    expect(wrapper.getByTestId('scroll-view').textContent).toBe('name1name2name3');
  });

  test('side-pop-up 组件 列表数据,自定义属性及事件"', () => {
    const wrapper = render(
      <SidePopUp
        title="标题"
        className="my-class"
        selectedId={selectedId}
        list={pageHouseTypeList}
        isOpen={isOpen}
        closePopUp={closePopUp}
        onSelectedClick={onSelectedClick}
      />,
    );

    expect(wrapper.getByTestId('taro-ui-AtDrawer').textContent).toBe('AtDrawer:show:true');
    expect(wrapper.getByTestId('title').textContent).toBe('标题');

    // 列表数据绑定验证
    pageHouseTypeList.map((item, index) => {
      expect(wrapper.getByTestId(`AtList-item-${item.id}`).textContent).toBe(item.name);
      if (pageHouseTypeList.length - 1 === index) {
        expect(wrapper.getByTestId(`AtList-item-${item.id}`)).toHaveClass('border-b');
        expect(wrapper.getByTestId(`AtList-item-box-${item.id}`)).not.toHaveClass('border-b');
      } else {
        expect(wrapper.getByTestId(`AtList-item-${item.id}`)).not.toHaveClass('border-b');
        expect(wrapper.getByTestId(`AtList-item-box-${item.id}`)).toHaveClass('border-b');
      }

      return item;
    });

    // 关闭事件验证
    isOpen = true;
    (wrapper.container.getElementsByClassName('icon-close')[0] as HTMLElement).click();
    expect(isOpen).toBeFalsy();

    // 选择事件验证
    isOpen = true;
    wrapper.getByTestId(`AtList-item-${pageHouseTypeList[1].id}`).click();
    expect(selectedId).toBe(pageHouseTypeList[1].id);
    expect(isOpen).toBeFalsy();

    isOpen = true;
    wrapper.rerender(
      <SidePopUp
        title="标题"
        className="my-class"
        selectedId={selectedId}
        list={pageHouseTypeList}
        isOpen={isOpen}
        closePopUp={closePopUp}
        onSelectedClick={onSelectedClick}
      />,
    );
    isOpen = false;
    wrapper.rerender(
      <SidePopUp
        title="标题"
        className="my-class"
        selectedId={selectedId}
        list={pageHouseTypeList}
        isOpen={isOpen}
        closePopUp={closePopUp}
      />,
    );
    expect(wrapper.getByTestId('taro-ui-AtDrawer').textContent).toBe('AtDrawer:show:false');
    // onSelectedClick不传不报错
    wrapper.getByTestId(`AtList-item-${pageHouseTypeList[1].id}`).click();

    // 自定义内容
    wrapper.rerender(
      <SidePopUp title="标题" className="my-class" isOpen={isOpen} closePopUp={closePopUp}>
        <div>自定义内容</div>
      </SidePopUp>,
    );

    expect(wrapper.getByTestId('scroll-view').innerHTML).toBe('<div>自定义内容</div>');
  });
});
