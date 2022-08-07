import axios, { AxiosRequestConfig } from 'axios';

const createAxios = (config: AxiosRequestConfig) => {
  const service = axios.create(config);
  service.interceptors.response.use((reply) => reply.data);
  return service;
};

const shopService = createAxios({
  baseURL: 'http://localhost:10100',
});

const guidelineService = createAxios({
  baseURL: 'http://localhost:10200',
});

export { shopService, guidelineService };
