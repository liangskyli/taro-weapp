import type { EnvEnumType, HostEnumType } from '@/config';
import { EnvEnumMap, HostMap } from '@/config';
import store from '@/store';
import type Taro from '@tarojs/taro';
import { hideLoading, request as taroRequest, showLoading, showModal } from '@tarojs/taro';
import { addUrlParams } from './common';

/**请求全路径，默认获取全局环境设置 */
function getFullUrl(url: string, routePrefix: string, customOption?: CustomRequestOption): string {
  const { envEnum = store.getState().global.envEnum as EnvEnumType, hostEnumType = 'default' } =
    customOption ?? {};
  if (/^(http[s]?:\/\/)/.test(url)) return url;
  const envKey = EnvEnumMap[envEnum];
  const baseUrl = HostMap[hostEnumType][envKey] || HostMap[hostEnumType][EnvEnumMap.prod];
  const result = `${baseUrl}${routePrefix}${url}`;
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

type CreateApiOptions = {
  /** url路由前缀,当url含有http全路径时忽略该配置 */
  routePrefix?: string;
};

type RequestOption = Taro.request.Option;

type CustomRequestOption = {
  /** 接口地址环境，默认从store中获取 */
  envEnum?: EnvEnumType;
  /** 接口地址类型 */
  hostEnumType?: HostEnumType;
  /** 是否显示错误提示，默认显示 */
  showError?: boolean;
  /** 是否显示加载提示，默认不显示 */
  showLoading?: boolean;
} & CreateApiOptions;

const isWxMsg = (msg) => `${msg}`.indexOf('request:') === 0 || `${msg}`.indexOf('wx:') === 0;

const request = (opts: RequestOption, routePrefix: string, customOption?: CustomRequestOption) => {
  if (customOption?.routePrefix) {
    routePrefix = customOption.routePrefix;
  }
  const options: RequestOption = {
    ...opts,
    url: getFullUrl(opts.url, routePrefix, customOption),
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
      return Promise.reject(res?.data);
    })
    .catch((err) => {
      if (!err) {
        err = { retCode: -1 };
      }
      let retMsg = err.retMsg || err.errMsg || '系统繁忙，请稍后再试';
      if (isWxMsg(retMsg)) {
        retMsg = '亲，您的网络正在开小差~';
      }
      const { showError = true } = customOption || {};
      if (showError) {
        showModal({ title: retMsg, showCancel: false });
      }
      err.retMsg = retMsg;
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
    (config?: Partial<ConfigType>) => Promise<CreateApiJsonData>
  >;
  Object.entries(config).forEach(([methodName, methodConfig]) => {
    api[methodName as keyof typeof config] = (payload) => {
      const { params, customOption, ...requestConfig } = {
        ...(methodConfig as ConfigType),
        ...payload,
      };
      const { routePrefix = '' } = options || {};
      let { url } = requestConfig;
      if (params) {
        url = addUrlParams(url, params);
      }
      return request(
        {
          ...requestConfig,
          url,
        },
        routePrefix,
        customOption,
      );
    };
  });

  return { ...api };
};

export { createApi };
