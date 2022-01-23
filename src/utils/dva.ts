import { create } from 'dva-core';
import immer from 'dva-immer';
import type { Action, AnyAction } from 'redux';

export type EffectsCommandMap = {
  put: <A extends AnyAction>(action: A) => any;
  call: Function;
  select: Function;
  take: Function;
  cancel: Function;
  [key: string]: any;
};

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;
export type ImmerReducer<S = any, A extends Action = AnyAction> = (state: S, action: A) => void;

let app;
const createApp = (opt) => {
  app = create(opt);
  app.use(immer());

  if (!global.registered) {
    opt.models.forEach((model) => app.model(model));
  }
  global.registered = true;
  app.start();

  const store = app._store;
  app.getStore = () => store;
  app.dispatch = store.dispatch;

  return app;
};

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  },
};
