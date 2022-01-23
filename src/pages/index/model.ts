import type { Effect } from '@/utils/dva';
import IndexApi from '@/service';

export type IndexModelState = {};

export type IndexModelType = {
  namespace: string;
  state: IndexModelState;
  effects: {
    getList: Effect;
    saveData: Effect;
  };
  reducers: {};
};

const initState: IndexModelState = {};

const IndexModel: IndexModelType = {
  namespace: 'index',
  state: initState,
  effects: {
    *getList({ payload }, { call }) {
      return yield call(IndexApi.getList, payload);
    },
    *saveData({ payload }, { call }) {
      return yield call(IndexApi.saveData, payload);
    },
  },
  reducers: {},
};

export default IndexModel;
