import { render } from '@testing-library/react';
import Icon from '@/components/icon';

describe('测试 icon 组件 ', () => {
  test('icon 组件:', () => {
    const wrapper = render(<Icon className="mb24" name="name1" />);
    expect(wrapper.getByTestId('icon')).toHaveClass('mb24');
    expect(wrapper.getByTestId('icon')).toHaveClass('icon');
    expect(wrapper.getByTestId('icon')).toHaveClass('icon-name1');

    wrapper.rerender(<Icon prefixClass="prefixClass" name="name1" size={20} color="#f00" />);
    expect(wrapper.getByTestId('icon')).toHaveClass('prefixClass');
    expect(wrapper.getByTestId('icon')).toHaveClass('prefixClass-name1');
    expect(wrapper.getByTestId('icon').style.fontSize).toBe('20px');
    expect(wrapper.getByTestId('icon').style.color).toBe('rgb(255, 0, 0)');
  });
});
