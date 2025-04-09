import { API_URLS } from '@/config/apiConfig';
import { AccountResponse } from '@/types';
import axiosInstance from '@/utils/axios';
import { getCacheService } from '.';
const cacheService = getCacheService<AccountResponse>('accountService');

export const accountService = {
  getAll: async () => {
    const cacheKey = 'accounts';
    return cacheService.get(cacheKey, async () => {
      const response = await axiosInstance.get(API_URLS.GET_ACCOUNTS);
      return response.data;
    });
  }
};
