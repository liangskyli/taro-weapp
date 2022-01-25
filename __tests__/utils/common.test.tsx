import { addUrlParams } from '@/utils/common';

describe('测试 utils/common ', () => {
  test('addUrlParams方法', () => {
    expect(addUrlParams('/a.html', { a: 1, b: 'b' })).toBe('/a.html?a=1&b=b');
    expect(addUrlParams('/a.html', { a: 1, b: '' })).toBe('/a.html?a=1');
    expect(addUrlParams('/a.html?t=1', { a: 1, b: 'b' })).toBe('/a.html?t=1&a=1&b=b');
  });
});
