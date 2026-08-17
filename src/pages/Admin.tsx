import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <Link to="/admin/register">
        Create User
      </Link>

      <br />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;