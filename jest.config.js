const { jsWithTs: tsjPreset } = require('ts-jest/presets');

module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  collectCoverage: true,
  transform: {
    ...tsjPreset.transform,
    '^.+\\.(css|less|sass|scss|stylus)$': require.resolve('./__tests__/transformers/css'),
  },
  testURL: 'http://localhost/',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    window: true,
    ENABLE_INNER_HTML: true,
    ENABLE_ADJACENT_HTML: true,
    ENABLE_SIZE_APIS: true,
    ENABLE_TEMPLATE_CONTENT: true,
    ENABLE_CLONE_NODE: true,
    ENABLE_CONTAINS: true,
    ENABLE_MUTATION_OBSERVER: true,
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  transformIgnorePatterns: [/*'<rootDir>/node_modules/(?!@taro)',*/ '^.+\\.(css|sass|scss|less)$'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './__tests__/jest.setup.tsx'],
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss|stylus)$': require.resolve('identity-obj-proxy'),
    '@tarojs/taro': '@tarojs/taro-h5',
    '@tarojs/components': '@tarojs/components/dist-h5/react',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
