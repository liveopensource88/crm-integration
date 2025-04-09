import { API_URLS } from '@/config/apiConfig';
import { CrmResponse } from '@/types';
import axiosInstance from '@/utils/axios';
import { getCacheService } from './cache.service';
const cacheService = getCacheService<CrmResponse>('crmService');

export const crmService = {
  getAll: async () => {
    const cacheKey = 'crms';
    return cacheService.get(cacheKey, async () => {
      const response = await axiosInstance.get(API_URLS.GET_CRMS);
      return response.data;
    });
  }
};
