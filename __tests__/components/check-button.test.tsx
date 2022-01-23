import { render } from '@testing-library/react';
import CheckButton from '@/components/check-button';

describe('测试 check-button 组件 ', () => {
  test('check-button 组件 1:', () => {
    let checked = false;
    render(<div />);
    expect(checked).toBeFalsy();
    const wrapper = render(<CheckButton checked={checked} className="mb24" />);

    expect(wrapper.getByTestId('check-button')).toHaveClass('mb24');
    expect(wrapper.getByTestId('check-button').innerHTML).toContain(
      'class="css-icon-check pos-r hide"',
    );
    expect(wrapper.getByTestId('check-button').innerHTML).toContain(
      'css-icon-check-white pos-r hide',
    );
    expect(wrapper.getByTestId('check-button').innerHTML).not.toContain('css-icon-check-bg hide');

    checked = true;
    wrapper.rerender(<CheckButton checked={checked} className="mb24" />);
    expect(wrapper.getByTestId('check-button').innerHTML).not.toContain(
      'class="css-icon-check pos-r hide"',
    );
    expect(wrapper.getByTestId('check-button').innerHTML).not.toContain(
      'css-icon-check-white pos-r hide',
    );
    expect(wrapper.getByTestId('check-button').innerHTML).toContain('css-icon-check-bg hide');
  });

  test('check-button 组件 2:', () => {
    let checked = false;
    const wrapper = render(<CheckButton checked={checked} showIcon={false} className="mb24" />);

    expect(wrapper.getByTestId('check-button').innerHTML).not.toContain('css-icon-check-white');

    checked = true;
    wrapper.rerender(<CheckButton checked={checked} showIcon={false} className="mb24" />);

    expect(wrapper.getByTestId('check-button').innerHTML).not.toContain('css-icon-check-white');

    wrapper.rerender(<CheckButton checked={checked} showIcon={false} />);
    expect(wrapper.getByTestId('check-button')).not.toHaveClass('mb24');
    expect(wrapper.getByTestId('check-button').innerHTML).not.toContain('css-icon-check-white');
  });
});
