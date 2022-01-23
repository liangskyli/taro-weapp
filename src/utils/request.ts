import type { EnvEnumType } from '@/config';
import { EnvEnum, EnvMap, HostMap } from '@/config';
import store from '@/store';
import type Taro from '@tarojs/taro';
import { hideLoading, request as taroRequest, showLoading, showModal } from '@tarojs/taro';
import { addUrlParams } from './common';

/**请求全路径，默认获取全局环境设置 */
function getFullUrl(url: string, envEnum: EnvEnumType = store.getState().global.envEnum): string {
  if (/^(http[s]?:\/\/)/.test(url)) return url;
  const envKey = EnvEnum[envEnum];
  const baseUrl = HostMap[envKey] || HostMap[EnvMap.prod];
  const result = `${baseUrl}${url}`;
  return result;
}

const getCommonHeader = () => {
  return {};
};

/**公共请求参数 */
const getCommonParams = () => {
  return {
    // t: Date.now(),
    // v: "1.0.0",
  };
};

type RequestOption = Taro.request.Option;

type CustomRequestOption = {
  /** 接口地址环境，默认从store中获取 */
  envEnum?: EnvEnumType;
  /** 是否显示错误提示，默认显示 */
  showError?: boolean;
  /** 是否显示加载提示，默认不显示 */
  showLoading?: boolean;
};

const isWxMsg = (msg) => `${msg}`.indexOf('request:') === 0 || `${msg}`.indexOf('wx:') === 0;

const request = (opts: RequestOption, customOption?: CustomRequestOption) => {
  const options: RequestOption = {
    ...opts,
    url: getFullUrl(opts.url, customOption?.envEnum),
    method: (opts.method || 'GET').toUpperCase() as keyof Taro.request.method,
    header: { ...getCommonHeader(), ...opts.header },
    data: { ...getCommonParams(), ...opts.data },
  };
  if (customOption?.showLoading) {
    showLoading({
      title: '加载中',
      mask: true,
    });
  }

  return taroRequest(options)
    .then((res) => {
      if (res && res.statusCode === 200 && res.data) {
        if (res.data.retCode === 0) {
          return res.data;
        }
      }
      return Promise.reject(res.data);
    })
    .catch((err) => {
      let retMsg = err?.retMsg || err?.errMsg || '系统繁忙，请稍后再试';
      if (isWxMsg(retMsg)) {
        retMsg = '亲，您的网络正在开小差~';
      }
      const { showError = true } = customOption || {};
      if (showError) {
        showModal({ title: retMsg, showCancel: false });
      }
      return Promise.reject(err);
    })
    .finally(() => {
      hideLoading();
    });
};

type CustomConfig = {
  /** url上加额外参数 */
  params?: Record<string, string>;
  /** 自定义参数 */
  customOption?: CustomRequestOption;
};
type CreateApiOptions = {
  /** url路由前缀 */
  routePrefix?: string;
};

export type CreateApiJsonData<T = any> = {
  retCode: string;
  retMsg: string;
  data: T;
};

const createApi = <T extends string>(
  config: Record<T, RequestOption & CustomConfig>,
  options?: CreateApiOptions,
) => {
  type ConfigType = RequestOption & CustomConfig;
  const api = {} as Record<
    keyof typeof config,
    (config?: ConfigType) => Promise<CreateApiJsonData>
  >;
  Object.entries(config).forEach(([methodName, methodConfig]) => {
    api[methodName as keyof typeof config] = (payload) => {
      const { params, customOption, ...requestConfig } = {
        ...(methodConfig as ConfigType),
        ...payload,
      };
      const { routePrefix = '' } = options || {};
      let { url } = requestConfig;
      url = `${routePrefix}${url}`;
      if (params) {
        url = addUrlParams(url, params);
      }
      return request(
        {
          ...requestConfig,
          url,
        },
        customOption,
      );
    };
  });

  return { ...api };
};

export { createApi };
