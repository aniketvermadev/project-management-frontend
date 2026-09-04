import {
  ArrowLeft,
  CalendarDays,
  Check,
  FolderKanban,
  ListTodo,
  Loader2,
  UserRound,
} from "lucide-react";

import {
  startTransition,
  useMemo,
  useOptimistic,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useProjects } from "../hooks/queries/useProjects";
import { useUsers } from "../hooks/queries/useUsers";
import { useCreateTask } from "../hooks/mutations/useCreateTask";

type TaskStatus =
  | "todo"
  | "in-progress"
  | "completed";

type TaskPriority =
  | "low"
  | "medium"
  | "high";

interface FormState {
  title: string;
  description: string;
  project: string;
  assignedTo: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;
}

const initialForm: FormState = {
  title: "",
  description: "",
  project: "",
  assignedTo: "",
  status: "todo",
  priority: "medium",
  deadline: "",
};

const CreateTask = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data: users = [],
    isLoading: usersLoading,
  } = useUsers();

  const {
    data: projects = [],
    isLoading: projectsLoading,
  } = useProjects(user?._id || "");

  const createTaskMutation =
    useCreateTask();

  const [form, setForm] =
    useState<FormState>(initialForm);

  const [optimisticForm, setOptimisticForm] =
    useOptimistic(form);

  const [error, setError] = useState("");

  const developers = useMemo(() => {
    return users.filter(
      (user) => user.role === "developer"
    );
  }, [users]);

  if (!user) {
    return null;
  }

  const canCreateTask =
    user.role === "admin" ||
    user.role === "manager";

  if (!canCreateTask) {
    return null;
  }

  const updateField = <
    K extends keyof FormState
  >(
    field: K,
    value: FormState[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");

    if (!form.title.trim()) {
      setError(
        "Task title is required."
      );
      return;
    }

    if (!form.project) {
      setError(
        "Please select a project."
      );
      return;
    }

    startTransition(() => {
      setOptimisticForm(form);

      createTaskMutation.mutate(
        {
          title: form.title.trim(),

          description:
            form.description.trim(),

          project: form.project,

          assignedTo:
            form.assignedTo,

          status: form.status,

          priority: form.priority,

          deadline:
            form.deadline || undefined,
        },

        {
          onSuccess: () => {
            navigate("/tasks");
          },

          onError: () => {
            setError(
              "Failed to create task. Please try again."
            );
          },
        }
      );
    });
  };

  const isSubmitting =
    createTaskMutation.isPending;

  const isLoading =
    usersLoading ||
    projectsLoading;

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      {/* Header */}

      <div className="flex items-center gap-4">

        <button
          type="button"
          onClick={() =>
            navigate("/tasks")
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="text-left">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create Task
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a task and assign it to a developer.
          </p>
        </div>

      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >

        <div className="space-y-8 p-6 sm:p-8">

          {/* Task Information */}

          <section>

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <ListTodo size={20} />
              </div>

              <div className="text-left">
                <h2 className="font-semibold text-slate-900">
                  Task Information
                </h2>

                <p className="text-xs text-slate-400">
                  Add the basic details for this task
                </p>
              </div>

            </div>

            <div className="space-y-5">

              {/* Title */}

              <div className="text-left">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Task title
                </label>

                <input
                  type="text"
                  value={
                    optimisticForm.title
                  }
                  onChange={(event) =>
                    updateField(
                      "title",
                      event.target.value
                    )
                  }
                  placeholder="e.g. Build authentication flow"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Description */}

              <div className="text-left">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={
                    optimisticForm.description
                  }
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe what needs to be done..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

            </div>

          </section>

          <div className="h-px bg-slate-100" />

          {/* Assignment */}

          <section className="text-left">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <UserRound size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Assignment
                </h2>

                <p className="text-xs text-slate-400">
                  Choose the project and developer
                </p>
              </div>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Project */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Project
                </label>

                <div className="relative">

                  <FolderKanban
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={
                      optimisticForm.project
                    }
                    onChange={(event) =>
                      updateField(
                        "project",
                        event.target.value
                      )
                    }
                    disabled={
                      projectsLoading
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">
                      {projectsLoading
                        ? "Loading projects..."
                        : "Select project"}
                    </option>

                    {projects.map(
                      (project) => (
                        <option
                          key={
                            project._id
                          }
                          value={
                            project._id
                          }
                        >
                          {project.title}
                        </option>
                      )
                    )}
                  </select>

                </div>
              </div>

              {/* Developer */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Assign developer
                </label>

                <div className="relative">

                  <UserRound
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={
                      optimisticForm.assignedTo
                    }
                    onChange={(event) =>
                      updateField(
                        "assignedTo",
                        event.target.value
                      )
                    }
                    disabled={
                      usersLoading
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">
                      {usersLoading
                        ? "Loading developers..."
                        : "Select developer"}
                    </option>

                    {developers.map(
                      (developer) => (
                        <option
                          key={
                            developer._id
                          }
                          value={
                            developer._id
                          }
                        >
                          {developer.name}
                        </option>
                      )
                    )}
                  </select>

                </div>
              </div>

            </div>

          </section>

          <div className="h-px bg-slate-100" />

          {/* Task Settings */}

          <section className="text-left">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <CalendarDays size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Task Settings
                </h2>

                <p className="text-xs text-slate-400">
                  Configure status, priority and deadline
                </p>
              </div>

            </div>

            <div className="grid gap-5 sm:grid-cols-3">

              {/* Status */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  value={
                    optimisticForm.status
                  }
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target
                        .value as TaskStatus
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="todo">
                    To Do
                  </option>

                  <option value="in-progress">
                    In Progress
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>
              </div>

              {/* Priority */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Priority
                </label>

                <select
                  value={
                    optimisticForm.priority
                  }
                  onChange={(event) =>
                    updateField(
                      "priority",
                      event.target
                        .value as TaskPriority
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="low">
                    Low
                  </option>

                  <option value="medium">
                    Medium
                  </option>

                  <option value="high">
                    High
                  </option>
                </select>
              </div>

              {/* Deadline */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Deadline
                </label>

                <input
                  type="date"
                  value={
                    optimisticForm.deadline
                  }
                  onChange={(event) =>
                    updateField(
                      "deadline",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

            </div>

          </section>

        </div>

        {/* Error */}

        {error && (
          <div className="border-t border-red-100 bg-red-50 px-6 py-4 text-sm text-red-600 sm:px-8">
            {error}
          </div>
        )}

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">

          <button
            type="button"
            onClick={() =>
              navigate("/tasks")
            }
            disabled={isSubmitting}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              isSubmitting ||
              isLoading
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />

                Creating...
              </>
            ) : (
              <>
                <Check size={17} />

                Create Task
              </>
            )}
          </button>

        </div>

      </form>

    </div>
  );
};

export default CreateTask;