import dva from '@/utils/dva';
import models from '@/models';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e) {
    console.error('dvaApp错误 ===> ', e);
  },
});

const store = dvaApp.getStore();

export default store;
