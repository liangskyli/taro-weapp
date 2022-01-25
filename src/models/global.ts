import type { Effect, ImmerReducer } from '@/utils/dva';
import type { EnvEnumType } from '@/config';

export type GlobalModelState = {
  envEnum: EnvEnumType;
};

export type GlobalModelType = {
  namespace: string;
  state: GlobalModelState;
  effects: {
    setEnvEnum: Effect;
  };
  reducers: {
    save: ImmerReducer<GlobalModelState>;
    reset: ImmerReducer<GlobalModelState>;
  };
};

const initState: GlobalModelState = {
  envEnum: 'dev',
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: initState,
  effects: {
    *setEnvEnum({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: payload,
      });
    },
  },
  reducers: {
    save(state, action) {
      state.envEnum = action.payload;
    },
    reset() {
      return { ...initState };
    },
  },
};

export default GlobalModel;
