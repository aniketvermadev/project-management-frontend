import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTask,
  type CreateTaskPayload,
} from "../../services/taskService";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: CreateTaskPayload
    ) => createTask(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};