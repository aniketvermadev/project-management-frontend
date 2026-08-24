import {
  Code2,
  FolderKanban,
  ListTodo,
} from "lucide-react";

import StatCard from "../components/StatCard";

interface ManagerDashboardProps {
  developerCount: number;
  projectCount: number;
  taskCount: number;
}

const ManagerDashboard = ({
  developerCount,
  projectCount,
  taskCount,
}: ManagerDashboardProps) => {
  return (
    <section>

      <div className="mb-5 text-left">
        <h2 className="text-lg font-semibold text-slate-900">
          Team Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monitor your team and project progress.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <StatCard
          label="Developers"
          value={developerCount}
          icon={Code2}
          description="Developers in your team"
        />

        <StatCard
          label="Projects"
          value={projectCount}
          icon={FolderKanban}
          description="Projects you're managing"
        />

        <StatCard
          label="Tasks"
          value={taskCount}
          icon={ListTodo}
          description="Tasks across your projects"
        />

      </div>

    </section>
  );
};

export default ManagerDashboard;