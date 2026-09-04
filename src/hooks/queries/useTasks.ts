import { useQuery } from "@tanstack/react-query";
import {
  getTasks,
} from "../../services/taskService";

export const useTasks = (user: any) => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(user || {}),
  });
};