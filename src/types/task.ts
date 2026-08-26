export type TaskStatus =
  | "todo"
  | "in-progress"
  | "completed";

export type TaskPriority =
  | "low"
  | "medium"
  | "high";

export interface TaskProject {
  _id: string;
  title: string;
}

export interface TaskUser {
  _id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  project: TaskProject;
  assignedTo: TaskUser;
  status: TaskStatus;
  priority: TaskPriority;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}