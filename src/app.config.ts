export default {
  pages: ['pages/index/index', 'pages/web-view/index', 'pages/second/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  subpackages: [
    {
      root: 'subpackages/package1',
      pages: ['pages/index/index'],
    },
  ],
};
