import { CreateRoleRequest } from "@/lib/schemas/roleSchemas";
import { Role } from "@/lib/types/roleTypes";
import { axiosClient } from "@/lib/utils/axiosClient";

export const rolesService = {
  getRoles: async () => {
    const res = await axiosClient.get<Role[]>("/roles");
    return res.data;
  },
  getRole: async (id: number) => {
    const res = await axiosClient.get<Role & { ruchers: { id: number; nom: string }[] }>(`/roles/${id}`);
    return res.data;
  },
  createRole: async (data: CreateRoleRequest) => {
    const res = await axiosClient.post<Role>("/roles", data);
    return res.data;
  },
  updateRole: async (id: number, data: CreateRoleRequest) => {
    const res = await axiosClient.put<Role>(`/roles/${id}`, data);
    return res.data;
  },
  deleteRole: async (id: number) => {
    await axiosClient.delete(`/roles/${id}`);
  },
};
