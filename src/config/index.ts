export const EnvMap = {
  dev: 'dev',
  test: 'test',
  release: 'release',
  prod: 'prod',
};

export const EnvEnum = {
  '0': EnvMap.dev,
  '1': EnvMap.test,
  '2': EnvMap.release,
  '3': EnvMap.prod,
};
export type EnvEnumType = keyof typeof EnvEnum;

export const HostMap = {
  [EnvMap.dev]: 'http://0.0.0.0:8001',
  [EnvMap.test]: 'https://test.example.cn',
  [EnvMap.release]: 'https://beta.example.cn',
  [EnvMap.prod]: 'https://prod.example.cn',
};
