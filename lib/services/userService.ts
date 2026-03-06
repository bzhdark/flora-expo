import { Role } from "@/lib/types/roleTypes";
import { User } from "@/lib/types/userTypes";
import { axiosClient } from "../utils/axiosClient";

export const userService = {
  getUser: async () => {
    const response = await axiosClient.get<User & { role: Role }>("/user");
    return response.data;
  },
};
