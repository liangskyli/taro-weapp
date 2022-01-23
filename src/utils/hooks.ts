import { useCallback, useEffect, useRef } from 'react';

export function useMultipleTrigger(fn: Function, times: number) {
  const { current } = useRef({
    fn,
    lastTime: Date.now(),
    count: 0,
    timer: null,
    delay: 400,
  });
  useEffect(
    function () {
      current.fn = fn;
    },
    [current, fn],
  );
  return useCallback(
    (...args: any[]) => {
      const nowTime = Date.now();
      const delta = nowTime - current.lastTime;
      if (delta < current.delay) {
        current.count++;
      } else {
        current.count = 1;
      }
      current.lastTime = nowTime;
      clearTimeout(current.timer as any);
      current.timer = setTimeout(() => {
        if (current.count >= times) {
          current.fn.call(this, ...args);
        }
      }, current.delay) as any;
    },
    [current, times],
  );
}
