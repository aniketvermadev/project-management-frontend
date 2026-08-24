import api from "./api";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "developer";
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");

  return response.data.users;
};