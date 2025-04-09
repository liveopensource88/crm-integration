export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
export const SOCKET_BASE_URL = import.meta.env.VITE_SOCKET_BASE_URL;
export const API_VERSION = '';
export const API_URLS = {
  GET_CRMS: `/mocks/crms.json`,
  GET_SCHEMA_BY_ID: (id: string) => `/mocks/${id}.json`,

  GET_ACCOUNTS: `${API_BASE_URL}${API_VERSION}/accounts`,

  GET_TICKETS: `${API_BASE_URL}${API_VERSION}/tickets`,

  GET_CONFIGURATION: `${API_BASE_URL}${API_VERSION}/config`
};
