import {
  Users,
  Code2,
  FolderKanban,
  ListTodo,
} from "lucide-react";

import StatCard from "../components/StatCard";

interface AdminDashboardProps {
  managerCount: number;
  developerCount: number;
  projectCount: number;
  taskCount: number;
}

const AdminDashboard = ({
  managerCount,
  developerCount,
  projectCount,
  taskCount,
}: AdminDashboardProps) => {
  return (
    <section>

      <div className="mb-5 text-left">
        <h2 className="text-lg font-semibold text-slate-900">
          Workspace Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Here's a quick look at your organization's activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          label="Managers"
          value={managerCount}
          icon={Users}
          description="Active managers"
        />

        <StatCard
          label="Developers"
          value={developerCount}
          icon={Code2}
          description="Team developers"
        />

        <StatCard
          label="Projects"
          value={projectCount}
          icon={FolderKanban}
          description="Total projects"
        />

        <StatCard
          label="Tasks"
          value={taskCount}
          icon={ListTodo}
          description="Total tasks"
        />

      </div>

    </section>
  );
};

export default AdminDashboard;