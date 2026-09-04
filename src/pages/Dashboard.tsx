import { useAuth } from "../context/AuthContext";

import { useUsers } from "../hooks/queries/useUsers";
import { useProjects } from "../hooks/queries/useProjects";
import { useTasks } from "../hooks/queries/useTasks";

import AdminDashboard from "./Admin";
import ManagerDashboard from "./Manager";
import DashboardSkeleton from "../components/loading/DashboardSkeleton";
import DeveloperDashboard from "./DeveloperDashboard";

import { ShieldCheck, UserCog, Code2 } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const canViewUsers =
    user?.role === "admin" || 
    user?.role === "manager";

  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useUsers(canViewUsers);

  const {
    data: projects = [],
    isLoading: projectsLoading,
    isError: projectsError,
  } = useProjects(user?._id || "");

  const {
    data: tasks = [],
    isLoading: tasksLoading,
    isError: tasksError,
  } = useTasks(user?._id || "");

  if (!user) {
    return null;
  }

  const isLoading =
    usersLoading ||
    projectsLoading ||
    tasksLoading;

  const isError =
    usersError ||
    projectsError ||
    tasksError;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-5 text-center">
          <p className="font-medium text-red-700">
            Failed to load dashboard data
          </p>

          <p className="mt-1 text-sm text-red-500">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  const managers = users.filter(
    (item) => item.role === "manager"
  );

  const developers = users.filter(
    (item) => item.role === "developer"
  );

  const roleConfig = {
    admin: {
      label: "Administrator",
      icon: ShieldCheck,
      description:
        "Manage your team, projects and overall workspace.",
    },

    manager: {
      label: "Manager",
      icon: UserCog,
      description:
        "Track your developers, projects and tasks.",
    },

    developer: {
      label: "Developer",
      icon: Code2,
      description:
        "Track your assigned projects and tasks.",
    },
  };

  const currentRole = roleConfig[user.role];

  const RoleIcon = currentRole.icon;

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm sm:px-8">

        {/* Background decoration */}

        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 right-20 h-40 w-40 rounded-full bg-violet-50 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500">
                Overview
              </span>

              <span className="h-1 w-1 rounded-full bg-slate-300" />

              <span className="text-sm text-slate-400">
                Dashboard
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome back, {user.name} 👋
            </h1>

            <p className="mt-2 text-left max-w-xl text-sm leading-6 text-slate-500">
              {currentRole.description}
            </p>
          </div>

          {/* Role badge */}

          <div className="flex items-center gap-3 self-start rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:self-auto">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <RoleIcon size={20} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Current role
              </p>

              <p className="text-sm font-semibold capitalize text-slate-800">
                {currentRole.label}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ================= ROLE DASHBOARD ================= */}

      {user.role === "admin" && (
        <AdminDashboard
          managerCount={managers.length}
          developerCount={developers.length}
          projectCount={projects.length}
          taskCount={tasks.length}
        />
      )}

      {user.role === "manager" && (
        <ManagerDashboard
          developerCount={developers.length}
          projectCount={projects.length}
          taskCount={tasks.length}
        />
      )}

      {user.role === "developer" && (
        <DeveloperDashboard
          projectCount={projects.length}
          taskCount={tasks.length}
        />
      )}

    </div>
  );
};

export default Dashboard;