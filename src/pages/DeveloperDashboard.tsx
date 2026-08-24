import {
  FolderKanban,
  ListTodo,
} from "lucide-react";

import StatCard from "../components/StatCard";

interface DeveloperDashboardProps {
  projectCount: number;
  taskCount: number;
}

const DeveloperDashboard = ({
  projectCount,
  taskCount,
}: DeveloperDashboardProps) => {
  return (
    <section>

      <div className="mb-5 text-left">
        <h2 className="text-lg font-semibold text-slate-900">
          My Workspace
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Keep track of your assigned projects and tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <StatCard
          label="My Projects"
          value={projectCount}
          icon={FolderKanban}
          description="Projects assigned to you"
        />

        <StatCard
          label="My Tasks"
          value={taskCount}
          icon={ListTodo}
          description="Tasks assigned to you"
        />

      </div>

    </section>
  );
};

export default DeveloperDashboard;