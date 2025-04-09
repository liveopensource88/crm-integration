import { FormResponse } from '@/types';
import axiosInstance from '@/utils/axios';
import { getCacheService } from '.';
const cacheService = getCacheService<FormResponse>('formService');

export const formService = {
  get: async (url: string) => {
    const cacheKey = url;
    return cacheService.get(cacheKey, async () => {
      const response = await axiosInstance.get(url);
      return response.data;
    });
  }
};
