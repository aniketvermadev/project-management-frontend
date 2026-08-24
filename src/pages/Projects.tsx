import { useAuth } from "../context/AuthContext";

const Projects = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h1>Projects</h1>

      {user.role === "admin" && (
        <button>
          Create Project
        </button>
      )}

      {user.role === "manager" && (
        <button>
          Create Project
        </button>
      )}

      <div>
        {/* Project list */}
      </div>
    </div>
  );
};

export default Projects;