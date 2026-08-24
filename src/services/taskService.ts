import api from "./api";

export interface Task {
  _id: string;
  title: string;
  status?: string;
  priority?: string;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");

  return response.data.tasks;
};