import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useMultipleTrigger } from '@/utils/hooks';

describe('测试 utils/hooks ', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  test('useMultipleTrigger方法', () => {
    jest.useFakeTimers();
    const mock = jest.fn();
    const {
      result: { current: clickFn },
    } = renderHook<any, () => void>(() => useMultipleTrigger(mock, 3));

    expect(mock).toBeCalledTimes(0);
    clickFn();
    clickFn();
    act(() => {
      jest.advanceTimersByTime(400);
    });
    clickFn();
    expect(mock).toBeCalledTimes(0);

    clickFn();
    clickFn();
    clickFn();
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(mock).toBeCalledTimes(1);

    clickFn();
    clickFn();
    clickFn();
    clickFn();
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(mock).toBeCalledTimes(2);
  });
});
