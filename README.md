# taro-weapp

基于 Taro 的 小程序 脚手架

> Taro-cli version: Taro v3.4.0

## 主要功能

- dva
- 异步请求接口封装
- 接口环境切换
- Typescript
- 单元测试
- mock服务

## 预览项目

```bash
# 全局安装taro脚手架
npm install -g @tarojs/cli
# 安装依赖
yarn

# 小程序 预览模式 => 用 小程序开发工具 打开 ./dist 文件夹 即可预览
yarn dev:weapp
```

## 打包项目

```bash
# 打包完成的小程序 文件在 ./dist 文件夹内
yarn build:weapp
```

## 注意事项

- 本项目拉取到本地后， “小程序开发工具” 请打开 “不校验合法域名”！ 方便查看 请求效果


## 目录结构
- 目录和文件名都用小写英文，单词间用中横线分隔)


    ├── __test__                    // 单元测试
    ├── dist/                       // 微信小程序编译结果目录
    ├── config/                     // Taro 配置目录
    │   ├── dev.js                  // 开发时配置
    │   ├── index.js                // 默认配置
    │   └── prod.js                 // 打包时配置
    ├── src/                        // 源码目录
    │   ├── assets/                 // 资源文件
    │   ├── components/             // 公共组件
    │   ├── config/                 // 配置文件
    │   │   └── index.ts
    │   ├── models/                
    │   │   ├── global.ts           // 全局 models
    │   │   └── index.ts            // 入口
    │   ├── pages                   // 页面文件目录
    │   │   └── index
    │   │       ├── components/     // 页面组件
    │   │       ├── model.ts        // 业务逻辑 (Dva model)
    │   │       ├── index.tsx       // 页面逻辑
    │   │       ├── index.config.ts // 页面配置
    │   │       └── index.less      // 页面样式
    │   ├── services/               // 全局模块请求
    │   ├── store/                  // dva 存储
    │   ├── style/                  // 全局样式通用函数功能集合
    │   ├── utils/                  // 常用工具类
    │   ├── app.less                // 全局样式
    │   ├── app.tsx                 // 入口文件
    │   └── index.html
    ├── .editorconfig               // 编辑器代码风格配置
    ├── .eslintignore               // eslint忽略文件
    ├── .eslintrc.js                // eslint规则
    ├── .gitignore                  // git忽略文件
    ├── .prettierignore             // 代码风格配置忽略文件
    ├── .prettierrc.js              // 代码风格配置文件
    ├── .stylelintignore            // 样式风格配置忽略文件
    ├── .stylelintrc.js             // 样式风格配置文件
    ├── .yarnrc                     // yarn配置文件
    ├── babel.config.js             // babel配置文件
    ├── global.d.ts                 // 全局类型配置
    ├── jest.config.js              // 单元测试配置文件
    ├── package.json                // 项目依赖
    ├── project.config.json         // 微信小程序项目配置
    ├── tsconfig.json               // typescript配置文件
    └── yarn.lock                   // yarn lock锁定文件


## 项目版本升级

```bash
# 1. 更新 Taro CLI 工具:
npm i -g @tarojs/cli@latest

# 2. 更新项目中 Taro 相关的依赖:
taro update project

# 3. 删除原来的node_modules后重新安装依赖(注意):
yarn
```

## 已配置的依赖

| 名称    | 库名称                                                                   | 用途                                  |
| ------- | ------------------------------------------------------------------------ | ------------------------------------- |
| Taro    | [@tarojs/taro](https://taro-docs.jd.com/taro/docs/README/index.html)     | 基础库                                |
| Taro-UI | [taro-ui](https://taro-ui.jd.com/#/docs/introduction)                    | 样式库                                |
| Dva     | [dva-core](https://dvajs.com/guide/)                                     | 基于 redux 和 redux-saga 的数据流方案 |
| Immer   | [dva-immer](https://github.com/dvajs/dva/tree/master/packages/dva-immer) | immer 不可变结构                      |

## 开发环境的依赖

| 名称             | 库名称                                                             | 用途              |
| --------------- | ----------------------------------------------------------------- | ----------------- |
| Typescript      | [typescript](https://www.typescriptlang.org/docs)                 | JS 超集语言        |
| ESLint          | [eslint](https://eslint.org/docs/user-guide/getting-started)      | 规范检查           |
| stylelint       | [stylelint](https://stylelint.io/)                                | 规范检查           |
| Prettier        | [prettier](https://prettier.io/docs/en/index.html)                | 代码格式化         |
| commitlint      | [commitlint](https://github.com/conventional-changelog/commitlint)| Git commit 规范化 |
| @liangskyli/mock| [@liangskyli/mock](https://github.com/liangskyli/mock)            | http mock服务     |
