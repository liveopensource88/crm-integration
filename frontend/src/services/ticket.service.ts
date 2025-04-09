import { API_URLS } from '@/config/apiConfig';
import { TicketResponse } from '@/types';
import axiosInstance from '@/utils/axios';
import { getCacheService } from '.';
const cacheService = getCacheService<TicketResponse>('ticketService');
const CACHE_KEY = 'tickets';

export const ticketService = {
  getAll: async () => {
    return cacheService.get(CACHE_KEY, async () => {
      const response = await axiosInstance.get(API_URLS.GET_TICKETS);
      return response.data;
    });
  },

  deleteCache: () => {
    return cacheService.invalidate(CACHE_KEY);
  }
};
