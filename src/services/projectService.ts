import api from "./api";

export interface Project {
  _id: string;
  title: string;
  description?: string;
}

export const getProjects = async (developerId: string): Promise<Project[]> => {
  const response = await api.get(`/projects?developer=${developerId}`);

  return response.data.projects;
};

export interface CreateProjectPayload {
  title: string;
  description: string;
  createdBy: string;
  assignedDevelopers: string[];
  status: "planning" | "in-progress" | "completed" | "on-hold";
  deadline: string;
}

export const createProject = async (
  payload: CreateProjectPayload
) => {
  const response = await api.post(
    "/projects/create",
    payload
  );

  return response.data;
};