import {
  CalendarDays,
  FolderKanban,
  Plus,
  Users,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useProjects } from "../hooks/queries/useProjects";

import Table from "../components/Table";
import type { Project } from "../types/project";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useProjects();

  if (!user) {
    return null;
  }

  const canCreateProject =
    user.role === "admin" ||
    user.role === "manager";

  const columns = [
    {
      key: "project",
      header: "Project",
      render: (project: Project) => (
        <div>
          <p className="font-semibold text-slate-800">
            {project.title}
          </p>

          {project.description && (
            <p className="mt-1 max-w-md truncate text-xs text-slate-400">
              {project.description}
            </p>
          )}
        </div>
      ),
    },

    {
      key: "developers",
      header: "Developers",
      render: (project: Project) => (
        <div className="flex items-center gap-2">

          <Users
            size={16}
            className="text-slate-400"
          />

          <span className="text-sm font-medium text-slate-600">
            {project.assignedDevelopers?.length ?? 0}
          </span>
        </div>
      ),
    },

    {
      key: "status",
      header: "Status",
      render: (project: Project) => {
        const statusStyles: Record<
          string,
          string
        > = {
          planning:
            "bg-slate-100 text-slate-600",

          "in-progress":
            "bg-blue-50 text-blue-600",

          completed:
            "bg-emerald-50 text-emerald-600",

          "on-hold":
            "bg-amber-50 text-amber-600",
        };

        return (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              statusStyles[project.status]
            }`}
          >
            {project.status.replace(
              "-",
              " "
            )}
          </span>
        );
      },
    },

    {
      key: "deadline",
      header: "Deadline",
      render: (project: Project) => (
        <div className="flex items-center gap-2 text-slate-500">

          <CalendarDays size={15} />

          <span>
            {new Date(
              project.deadline
            ).toLocaleDateString()}
          </span>

        </div>
      ),
    },

    {
      key: "createdBy",
      header: "Created By",
      render: (project: Project) => (
        <span className="text-slate-600">
          {project.createdBy?.name ?? "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div className="text-left">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage projects and track their progress.
          </p>

        </div>

        {canCreateProject && (
          <button
            type="button"
            onClick={() => navigate("/projects/create")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus size={18} />
            Create Project
          </button>
        )}

      </div>

      {/* Project count */}

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <FolderKanban size={20} />
        </div>

        <div className="text-left">
          <p className="text-sm text-slate-400">
            Total Projects
          </p>

          <p className="text-xl font-bold text-slate-900">
            {projects.length}
          </p>
        </div>

      </div>

      {/* Table */}

      <Table
        data={projects}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        emptyMessage="No projects found"
      />

    </div>
  );
};

export default Projects;