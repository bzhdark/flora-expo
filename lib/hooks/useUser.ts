import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { QUERY_KEYS } from "../utils/queryKeys";

export const useUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS.current,
    queryFn: userService.getUser,
  });
};
