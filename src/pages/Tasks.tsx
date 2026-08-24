import { useAuth } from "../context/AuthContext";

const Tasks = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h1>Tasks</h1>

      {user.role !== "developer" && (
        <button>
          Create Task
        </button>
      )}

      {/* Task list */}
    </div>
  );
};

export default Tasks;