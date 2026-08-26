export type ProjectStatus =
  | "planning"
  | "in-progress"
  | "completed"
  | "on-hold";

export interface ProjectUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "developer";
}

export interface Project {
  _id: string;
  title: string;
  description?: string;
  createdBy: ProjectUser;
  assignedDevelopers: ProjectUser[];
  status: ProjectStatus;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}