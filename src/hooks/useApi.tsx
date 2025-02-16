import { useState } from 'react';
import api from '../lib/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const request = async (
    method: 'get' | 'post' | 'put' | 'delete', 
    url: string, 
    data?: any, 
    headers?: any
  ) => {
    setLoading(true);
    setError(null);
  
    try {
      const config = {
        method,
        url,
        data,
        headers: {
          ...(data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}), 
          ...headers,
        },
      };
  
      const response = await api(config);
      setData(response.data);
      return response.data;
    } catch (error: any) {
      setError(error?.response?.data?.message || error?.message || 'An error occurred');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error, data };
};
