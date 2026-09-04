import { useQuery } from "@tanstack/react-query";
import {
  getProjects,
} from "../../services/projectService";

export const useProjects = (developerId: string) => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(developerId),
  });
};