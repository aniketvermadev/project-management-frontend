import api from "./api";

export interface Task {
  _id: string;
  title: string;
  status?: string;
  priority?: string;
}

export const getTasks = async (user: any): Promise<Task[]> => {
  const response = await api.get(`/tasks?${user?.role}=${user?._id || ""}`);

  return response.data.tasks;
};

export interface CreateTaskPayload {
  title: string;
  description: string;
  project: string;
  assignedTo: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  deadline?: string;
}

export const createTask = async (
  payload: CreateTaskPayload
) => {
  const response = await api.post(
    "/tasks/create",
    payload
  );

  return response.data;
};