import { act, render } from '@testing-library/react';
import type { Columns } from '@/components/table';
import Table from '@/components/table';

describe('测试 Table 组件 ', () => {
  test('Table 组件:', () => {
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
        render: (text) => {
          return <div>{text}</div>;
        },
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
        name2: '201',
        name3: '301',
        name4: '4001',
        name5: '5001',
        children: [
          {
            name: '类别1',
            name1: '1011',
            name2: '2011',
            name3: '3011',
            name4: '40011',
            name5: '50011',
          },
          {
            name: '类别2',
            name1: '1012',
            name2: '2012',
            name3: '3012',
            name4: '40012',
            name5: '50012',
          },
        ],
      },
    ];
    const wrapper = render(<Table columns={columns} dataSource={dataSource} />);
    wrapper.debug();

    expect((wrapper.getByText('title').parentElement as HTMLElement).outerHTML).toBe(
      '<taro-view-core class="item  item-fixed " style="justify-content: left;"><taro-view-core>title</taro-view-core></taro-view-core>',
    );
    expect((wrapper.getByText('title1').parentElement as HTMLElement).outerHTML).toBe(
      '<taro-view-core class="item item-has-sub  "><taro-view-core>title1</taro-view-core><taro-view-core>subTitle1</taro-view-core></taro-view-core>',
    );
    expect(wrapper.baseElement.textContent).toBe(
      'titletitle1subTitle1title2title3title4title5合计102030400500类别10120130140015001类别11011201130114001150011类别21012201230124001250012',
    );
    expect(wrapper.getByTestId('0-0-content')).toHaveClass('item-fixed');
    expect(wrapper.getByTestId('0-1-content')).not.toHaveClass('item-fixed');
    expect(wrapper.getByTestId('1-0-0-content-children')).toHaveClass('item-fixed');
    expect(wrapper.getByTestId('1-1-0-content-children')).not.toHaveClass('item-fixed');

    expect(wrapper.getByTestId('1-1-0-content-children').innerHTML).toBe('1011');
    expect(wrapper.getByTestId('1-2-0-content-children').innerHTML).toBe('<div>2011</div>');

    // row click
    expect(wrapper.getByTestId('0-content-onCollapse')).not.toHaveClass('row-bg');
    expect(wrapper.getByTestId('1-content-onCollapse')).toHaveClass('row-bg');
    expect(wrapper.getByTestId('0-0-content').innerHTML).toBe('合计');
    expect(
      wrapper.getByTestId('1-0-content').innerHTML.indexOf('icon-sanjiao_shouqi') > -1,
    ).toBeTruthy();
    act(() => {
      wrapper.getByTestId('1-content-onCollapse').click();
    });
    expect(
      wrapper.getByTestId('1-0-content').innerHTML.indexOf('icon-sanjiao_shouqi') > -1,
    ).toBeFalsy();
    expect(
      wrapper.getByTestId('1-0-content').innerHTML.indexOf('icon-sanjiao_zhankai') > -1,
    ).toBeTruthy();
    act(() => {
      wrapper.getByTestId('1-content-onCollapse').click();
    });
    expect(
      wrapper.getByTestId('1-0-content').innerHTML.indexOf('icon-sanjiao_shouqi') > -1,
    ).toBeTruthy();
  });
});
