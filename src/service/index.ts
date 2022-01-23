import { createApi } from '@/utils/request';

const IndexApi = createApi(
  {
    getList: {
      url: '/get-list',
      method: 'GET',
      customOption: { showError: true, showLoading: true },
    },
    saveData: {
      url: '/save-data',
      method: 'POST',
    },
  },
  { routePrefix: '/api' },
);

export default IndexApi;
