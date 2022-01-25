export const EnvEnumMap = {
  dev: 'dev',
  test: 'test',
  release: 'release',
  prod: 'prod',
};

export type EnvEnumType = keyof typeof EnvEnumMap;

export const HostEnumMap = {
  default: 'default',
  host2: 'host2',
};

export type HostEnumType = keyof typeof HostEnumMap;

export const HostMap = {
  [HostEnumMap.default]: {
    [EnvEnumMap.dev]: 'http://0.0.0.0:8001',
    [EnvEnumMap.test]: 'https://test.example.cn',
    [EnvEnumMap.release]: 'https://beta.example.cn',
    [EnvEnumMap.prod]: 'https://prod.example.cn',
  },
  [HostEnumMap.host2]: {
    [EnvEnumMap.dev]: 'http://0.0.0.0:8001',
    [EnvEnumMap.test]: 'https://test2.example.cn',
    [EnvEnumMap.release]: 'https://beta2.example.cn',
    [EnvEnumMap.prod]: 'https://prod2.example.cn',
  },
};
