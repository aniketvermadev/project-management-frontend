import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createProject,
  type CreateProjectPayload,
} from "../../services/projectService";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: CreateProjectPayload
    ) => createProject(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};