import { useQuery } from "@tanstack/react-query";
import {
  getUsers,
} from "../../services/userService";

export const useUsers = (enabled = true) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled
  });
};