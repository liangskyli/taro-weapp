import { createApi } from '@/utils/request';
import { EnvEnumMap, HostEnumMap, HostMap } from '@/config';

(global as any).jestRequestOptions = '';
jest.mock('@tarojs/taro', () => {
  const originalModule = jest.requireActual('@tarojs/taro');
  return {
    ...originalModule,
    request: (options: any) => {
      (global as any).jestRequestOptions = options;
      if (options.url.indexOf('id=id1') > -1) {
        return Promise.resolve({ statusCode: 200, data: { retCode: 0, retMsg: '', data: '' } });
      }
      if (options.url.indexOf('id=id2') > -1) {
        return Promise.resolve({ statusCode: 200, data: { retCode: 0, retMsg: '', data: '' } });
      }
      if (options.data.data1 === 'data1') {
        return Promise.resolve({
          statusCode: 200,
          data: { retCode: 10, retMsg: '', data: '' },
        });
      }
      if (options.url.indexOf('id=id4') > -1) {
        return Promise.resolve({
          statusCode: 200,
          data: { retCode: 10, retMsg: 'wx:wxtodo', data: '' },
        });
      }
      if (options.url.indexOf('id=id5') > -1) {
        return Promise.resolve();
      }
      return Promise.resolve({ statusCode: 200, data: { retCode: 0 } });
    },
  };
});
jest.mock('@/store', () => {
  return {
    getState: () => {
      return {
        global: { envEnum: undefined },
      };
    },
  };
});

describe('测试 utils/request ', () => {
  test('createApi方法', async () => {
    const IndexApi = createApi(
      {
        getList: {
          url: '/get-list',
          method: 'GET',
          customOption: {
            showError: true,
            showLoading: true,
            envEnum: 'dev',
            routePrefix: '/api2',
          },
        },
        getList2: {
          url: 'http://test.com/get-list2',
        },
        saveData: {
          url: '/save-data',
          method: 'POST',
        },
      },
      { routePrefix: '/api' },
    );
    const result1 = await IndexApi.getList({
      params: { id: 'id1' },
    });
    expect((global as any).jestRequestOptions).toEqual({
      url: `${HostMap[HostEnumMap.default][EnvEnumMap.dev]}/api2/get-list?id=id1`,
      method: 'GET',
      header: {},
      data: {},
    });
    expect(result1).toEqual({ retCode: 0, retMsg: '', data: '' });

    const result2 = await IndexApi.getList2({
      params: { id: 'id2' },
    });
    expect((global as any).jestRequestOptions).toEqual({
      url: 'http://test.com/get-list2?id=id2',
      method: 'GET',
      header: {},
      data: {},
    });
    expect(result2).toEqual({ retCode: 0, retMsg: '', data: '' });

    let result3 = null;
    await IndexApi.saveData({
      params: { id: 'id3' },
      data: { data1: 'data1' },
    }).catch((error) => {
      result3 = error;
    });
    expect((global as any).jestRequestOptions).toEqual({
      url: `${HostMap[HostEnumMap.default][EnvEnumMap.prod]}/api/save-data?id=id3`,
      method: 'POST',
      header: {},
      data: { data1: 'data1' },
    });
    expect(result3).toEqual({ retCode: 10, retMsg: '系统繁忙，请稍后再试', data: '' });

    const IndexApi2 = createApi({
      getList: {
        url: '/get-list',
        method: 'GET',
        customOption: { showError: true, showLoading: true, envEnum: 'dev', hostEnumType: 'host2' },
      },
      getList2: {
        url: 'http://test.com/get-list2',
      },
      saveData: {
        url: '/save-data',
        method: 'POST',
      },
    });
    let result4 = null;
    await IndexApi2.getList({
      params: { id: 'id4' },
    }).catch((error) => {
      result4 = error;
    });
    expect((global as any).jestRequestOptions).toEqual({
      url: `${HostMap[HostEnumMap.host2][EnvEnumMap.dev]}/get-list?id=id4`,
      method: 'GET',
      header: {},
      data: {},
    });
    expect(result4).toEqual({ retCode: 10, retMsg: '亲，您的网络正在开小差~', data: '' });

    let result5 = null;
    await IndexApi2.getList({
      params: { id: 'id5' },
    }).catch((error) => {
      result5 = error;
    });
    expect((global as any).jestRequestOptions).toEqual({
      url: `${HostMap[HostEnumMap.default][EnvEnumMap.dev]}/get-list?id=id5`,
      method: 'GET',
      header: {},
      data: {},
    });
    expect(result5).toEqual({ retCode: -1, retMsg: '系统繁忙，请稍后再试' });
  });
});
