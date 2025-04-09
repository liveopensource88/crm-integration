import { API_URLS } from '@/config/apiConfig';
import { HttpMethod, SchemaResponse } from '@/types';
import axiosInstance from '@/utils/axios';
import { getCacheService } from './cache.service';
import { AxiosResponse } from 'axios';
const cacheService = getCacheService<SchemaResponse>('schemaService');

export const schemaService = {
  get: async (id: string) => {
    const cacheKey = `schema-${id}`;
    return cacheService.get(cacheKey, async () => {
      const response = await axiosInstance.get(API_URLS.GET_SCHEMA_BY_ID(id));
      return response.data;
    });
  },

  save: async (url: string, data: Record<string, string | null | boolean>, method: HttpMethod) => {
    const response: AxiosResponse = await axiosInstance[method](url, data);
    return response.data;
  }
};
