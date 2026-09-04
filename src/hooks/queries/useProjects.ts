import { useQuery } from "@tanstack/react-query";
import {
  getProjects,
} from "../../services/projectService";

export const useProjects = (user: any) => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(user),
  });
};