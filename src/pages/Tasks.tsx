import {
  CalendarDays,
  ListTodo,
  Plus,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/queries/useTasks";

import Table from "../components/Table";
import type { Task } from "../types/task";

const Tasks = () => {
  const { user } = useAuth();

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useTasks();

  if (!user) {
    return null;
  }

  const canCreateTask =
    user.role === "admin" ||
    user.role === "manager";

  const columns = [
    {
      key: "task",
      header: "Task",
      render: (task: Task) => (
        <div>
          <p className="font-semibold text-slate-800">
            {task.title}
          </p>

          {task.description && (
            <p className="mt-1 max-w-md truncate text-xs text-slate-400">
              {task.description}
            </p>
          )}
        </div>
      ),
    },

    {
      key: "project",
      header: "Project",
      render: (task: Task) => (
        <span className="text-slate-600">
          {task.project?.title ?? "—"}
        </span>
      ),
    },

    {
      key: "assignedTo",
      header: "Assigned To",
      render: (task: Task) => (
        <div className="flex items-center gap-2">

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
            {task.assignedTo?.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <span className="font-medium text-slate-700">
            {task.assignedTo?.name ?? "—"}
          </span>

        </div>
      ),
    },

    {
      key: "priority",
      header: "Priority",
      render: (task: Task) => {

        const priorityStyles: Record<
          string,
          string
        > = {
          low:
            "bg-slate-100 text-slate-600",

          medium:
            "bg-amber-50 text-amber-600",

          high:
            "bg-red-50 text-red-600",
        };

        return (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              priorityStyles[task.priority]
            }`}
          >
            {task.priority}
          </span>
        );
      },
    },

    {
      key: "status",
      header: "Status",
      render: (task: Task) => {

        const statusStyles: Record<
          string,
          string
        > = {
          todo:
            "bg-slate-100 text-slate-600",

          "in-progress":
            "bg-blue-50 text-blue-600",

          completed:
            "bg-emerald-50 text-emerald-600",
        };

        return (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              statusStyles[task.status]
            }`}
          >
            {task.status.replace(
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
      render: (task: Task) => (
        <div className="flex items-center gap-2 text-slate-500">

          <CalendarDays size={15} />

          <span>
            {task.deadline
              ? new Date(
                  task.deadline
                ).toLocaleDateString()
              : "No deadline"}
          </span>

        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div className="text-left">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track and manage tasks across your projects.
          </p>

        </div>

        {canCreateTask && (
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus size={18} />
            Create Task
          </button>
        )}

      </div>

      {/* Task count */}

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <ListTodo size={20} />
        </div>

        <div className="text-left">
          <p className="text-sm text-slate-400">
            Total Tasks
          </p>

          <p className="text-xl font-bold text-slate-900">
            {tasks.length}
          </p>
        </div>

      </div>

      {/* Table */}

      <Table
        data={tasks}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        emptyMessage="No tasks found"
      />

    </div>
  );
};

export default Tasks;