import { useQuery } from "@tanstack/react-query";
import {
  getTasks,
} from "../../services/taskService";

export const useTasks = (developerId: string) => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(developerId || ""),
  });
};