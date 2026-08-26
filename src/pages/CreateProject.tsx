import {
  ArrowLeft,
  CalendarDays,
  Check,
  FolderKanban,
  Loader2,
  Users,
} from "lucide-react";

import {
  useState,
  useOptimistic,
  startTransition,
  useMemo,
} from "react";

import { useNavigate } from "react-router-dom";

import { useUsers } from "../hooks/queries/useUsers";
import { useCreateProject } from "../hooks/mutations/useCreateProject";
import { useAuth } from "../context/AuthContext";

type ProjectStatus =
  | "planning"
  | "in-progress"
  | "completed"
  | "on-hold";

interface FormState {
  title: string;
  description: string;
  assignedDevelopers: string[];
  status: ProjectStatus;
  deadline: string;
}

const initialForm: FormState = {
  title: "",
  description: "",
  assignedDevelopers: [],
  status: "planning",
  deadline: "",
};

const CreateProject = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const {
    data: users = [],
    isLoading: usersLoading,
  } = useUsers();

  const createProjectMutation =
    useCreateProject();

  const developers = useMemo(
    () =>
      users.filter(
        (user) => user.role === "developer"
      ),
    [users]
  );

  const [form, setForm] =
    useState<FormState>(initialForm);

  const [optimisticForm, setOptimisticForm] =
    useOptimistic(form);

  const [error, setError] = useState("");

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

  const toggleDeveloper = (
    developerId: string
  ) => {
    const exists =
      form.assignedDevelopers.includes(
        developerId
      );

    updateField(
      "assignedDevelopers",
      exists
        ? form.assignedDevelopers.filter(
            (id) => id !== developerId
          )
        : [
            ...form.assignedDevelopers,
            developerId,
          ]
    );
  };

  console.log("Current User:", currentUser);

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");

    if (!form.title.trim()) {
      setError("Project title is required.");
      return;
    }

    if (!form.deadline) {
      setError("Project deadline is required.");
      return;
    }

    startTransition(() => {
      setOptimisticForm(form);

      createProjectMutation.mutate(
        {
          title: form.title.trim(),
          description:
            form.description.trim(),
          createdBy: currentUser?._id || "",
          assignedDevelopers:
            form.assignedDevelopers,
          status: form.status,
          deadline: form.deadline,
        },
        {
          onSuccess: () => {
            navigate("/projects");
          },

          onError: () => {
            setError(
              "Failed to create project. Please try again."
            );
          },
        }
      );
    });
  };

  const isSubmitting =
    createProjectMutation.isPending;

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      {/* Header */}

      <div className="flex items-center gap-4">

        <button
          type="button"
          onClick={() =>
            navigate("/projects")
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="text-left">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create Project
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a new project and assign developers.
          </p>
        </div>

      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >

        <div className="space-y-8 p-6 sm:p-8">

          {/* Project information */}

          <section>

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FolderKanban size={20} />
              </div>

              <div className="text-left">
                <h2 className="font-semibold text-slate-900">
                  Project Information
                </h2>

                <p className="text-xs text-slate-400">
                  Basic information about the project
                </p>
              </div>

            </div>

            <div className="space-y-5">

              {/* Title */}

              <div className="text-left">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Project title
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
                  placeholder="e.g. E-commerce Platform"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Description */}

              <div className="text-left">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  value={
                    optimisticForm.description
                  }
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value
                    )
                  }
                  rows={5}
                  placeholder="Describe the project..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

            </div>

          </section>

          <div className="h-px bg-slate-100" />

          {/* Project settings */}

          <section>

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <CalendarDays size={20} />
              </div>

              <div className="text-left">
                <h2 className="font-semibold text-slate-900">
                  Project Settings
                </h2>

                <p className="text-xs text-slate-400">
                  Configure project status and deadline
                </p>
              </div>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Status */}

              <div className="text-left">
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
                        .value as ProjectStatus
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="planning">
                    Planning
                  </option>

                  <option value="in-progress">
                    In Progress
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                  <option value="on-hold">
                    On Hold
                  </option>
                </select>
              </div>

              {/* Deadline */}

              <div className="text-left">
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

          <div className="h-px bg-slate-100" />

          {/* Developers */}

          <section>

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Users size={20} />
              </div>

              <div className="text-left">
                <h2 className="font-semibold text-slate-900">
                  Assign Developers
                </h2>

                <p className="text-xs text-slate-400">
                  Select developers who will work on this project
                </p>
              </div>

            </div>

            {usersLoading ? (
              <div className="rounded-xl border border-slate-200 p-5 text-sm text-slate-500">
                Loading developers...
              </div>
            ) : developers.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
                <p className="text-sm font-medium text-slate-600">
                  No developers available
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Create a developer before assigning one to this project.
                </p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">

                {developers.map(
                  (developer) => {
                    const selected =
                      optimisticForm.assignedDevelopers.includes(
                        developer._id
                      );

                    return (
                      <button
                        key={developer._id}
                        type="button"
                        onClick={() =>
                          toggleDeveloper(
                            developer._id
                          )
                        }
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                          {developer.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="truncate text-sm font-semibold text-slate-800">
                            {developer.name}
                          </p>

                          <p className="truncate text-xs text-slate-400">
                            {developer.email}
                          </p>

                        </div>

                        {selected && (
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
                            <Check size={14} />
                          </div>
                        )}

                      </button>
                    );
                  }
                )}

              </div>
            )}

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
              navigate("/projects")
            }
            disabled={isSubmitting}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
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

                Create Project
              </>
            )}
          </button>

        </div>

      </form>
    </div>
  );
};

export default CreateProject;