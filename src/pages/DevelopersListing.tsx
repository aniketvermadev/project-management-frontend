import { useMemo } from "react";
import {
  Code2,
  Mail,
  Users,
} from "lucide-react";

import { useUsers } from "../hooks/queries/useUsers";
import Table from "../components/Table";
import type { User } from "../types/auth";

const DevelopersListing = () => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useUsers();

  const developers = useMemo(() => {
    return users.filter(
      (user: User) => user.role === "developer"
    );
  }, [users]);

  const columns = [
    {
      key: "developer",
      header: "Developer",
      render: (developer: User) => (
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
            {developer.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              {developer.name}
            </p>

            <p className="text-xs text-slate-400">
              Developer
            </p>
          </div>

        </div>
      ),
    },

    {
      key: "email",
      header: "Email",
      render: (developer: User) => (
        <div className="flex items-center gap-2">
          <Mail
            size={16}
            className="text-slate-400"
          />

          <span className="text-slate-600">
            {developer.email}
          </span>
        </div>
      ),
    },

    {
      key: "role",
      header: "Role",
      render: (developer: User) => (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-600">
          <Code2 size={13} />
          {developer.role}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl text-left font-bold tracking-tight text-slate-900">
            Developers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and view developers in your organization.
          </p>
        </div>

        {/* Developer count */}

        <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Users size={18} />
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Total developers
            </p>

            <p className="text-lg text-left font-bold text-slate-900">
              {developers.length}
            </p>
          </div>

        </div>

      </div>

      {/* Developers table */}

      <Table
        data={developers}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        emptyMessage="No developers found"
      />

    </div>
  );
};

export default DevelopersListing;