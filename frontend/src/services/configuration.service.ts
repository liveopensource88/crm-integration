import { API_URLS } from '@/config/apiConfig';
import axiosInstance from '@/utils/axios';

export const configurationService = {
  getConfiguration: async (id?: string) => {
    const url = id ? `${API_URLS.GET_CONFIGURATION}?type=${id}` : API_URLS.GET_CONFIGURATION;
    const response = await axiosInstance.get(url);
    return response.data;
  }
};
