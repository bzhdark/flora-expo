import { Sirop, SiropRequest } from "@/lib/types/siropTypes";
import { axiosClient } from "@/lib/utils/axiosClient";

export const siropService = {
  getSirops: async () => {
    const response = await axiosClient.get<Sirop[]>("/sirops");
    return response.data;
  },
  getSirop: async (id: number) => {
    const response = await axiosClient.get<Sirop>(`/sirops/${id}`);
    return response.data;
  },
  createSirop: async (data: SiropRequest) => {
    const response = await axiosClient.post<Sirop>("/sirops", data);
    return response.data;
  },
  updateSirop: async (id: number, data: SiropRequest) => {
    const response = await axiosClient.put<Sirop>(`/sirops/${id}`, data);
    return response.data;
  },
  deleteSirop: async (id: number) => {
    await axiosClient.delete(`/sirops/${id}`);
  },
};
