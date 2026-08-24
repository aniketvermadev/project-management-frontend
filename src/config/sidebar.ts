import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ListTodo,
} from "lucide-react";

import type { Role } from "../types/auth";

export interface SidebarItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const sidebarItems: Record<Role, SidebarItem[]> = {
  admin: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Developers",
      path: "/developers",
      icon: Users,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: ListTodo,
    },
  ],

  manager: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Developers",
      path: "/developers",
      icon: Users,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: ListTodo,
    },
  ],

  developer: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: ListTodo,
    },
  ],
};