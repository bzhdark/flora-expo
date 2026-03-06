import { ApiResponse } from '@/lib/types/api/responseTypes';
import { CreateHausseBulkRequest, Hausse, HausseRequest } from '@/lib/types/hausseTypes';
import { axiosClient } from '@/lib/utils/axiosClient';

export const haussesService = {
  getHausses: async () => {
    const response = await axiosClient.get<Hausse[]>("/hausses");
    return response.data;
  },
  getHausse: async (id: number) => {
    const response = await axiosClient.get<Hausse>(`/hausses/${id}`);
    return response.data;
  },
  createHausse: async (data: HausseRequest) => {
    const response = await axiosClient.post<Hausse>("/hausses", data);
    return response.data;
  },
  updateHausse: async (id: number, data: HausseRequest) => {
    const response = await axiosClient.put<Hausse>(`/hausses/${id}`, data);
    return response.data;
  },
  deleteHausse: async (id: number) => {
    const response = await axiosClient.delete<ApiResponse>(`/hausses/${id}`);
    return response.data;
  },
  createHaussesBulk: async (data: CreateHausseBulkRequest) => {
    const response = await axiosClient.post<ApiResponse>("/hausses/create-many", data);
    return response.data;
  },
};
