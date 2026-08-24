import api from "./api";

export interface Project {
  _id: string;
  title: string;
  description?: string;
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get("/projects");

  return response.data.projects;
};