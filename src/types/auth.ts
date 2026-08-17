export type Role = "admin" | "manager" | "developer";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

export interface LoginResponse {
  token: string;
  user: User;
}