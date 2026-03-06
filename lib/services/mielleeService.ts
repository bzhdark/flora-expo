import { Miellee, MielleeRequest } from "@/lib/types/mielleeTypes";
import { axiosClient } from "@/lib/utils/axiosClient";

export const mielleeService = {
  getMiellees: async () => {
    const response = await axiosClient.get<Miellee[]>("/miellees");
    return response.data;
  },
  getMiellee: async (id: number) => {
    const response = await axiosClient.get<Miellee>(`/miellees/${id}`);
    return response.data;
  },
  createMiellee: async (data: MielleeRequest) => {
    const response = await axiosClient.post<Miellee>("/miellees", data);
    return response.data;
  },
  updateMiellee: async (id: number, data: MielleeRequest) => {
    const response = await axiosClient.put<Miellee>(`/miellees/${id}`, data);
    return response.data;
  },
  deleteMiellee: async (id: number) => {
    await axiosClient.delete(`/miellees/${id}`);
  },
};
