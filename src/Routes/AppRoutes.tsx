import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import Unauthorized from "../pages/Unauthorized";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";
import DevelopersListing from "../pages/DevelopersListing";
import CreateProject from "../pages/CreateProject";
import CreateTask from "../pages/CreateTask";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* All authenticated users */}
      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>

          {/* Dashboard - Admin, Manager, Developer */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Developers - Admin + Manager */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "admin",
                  "manager",
                ]}
              />
            }
          >
            <Route
              path="/developers"
              element={<DevelopersListing />}
            />

            <Route
              path="/projects/create"
              element={<CreateProject />}
            />
            <Route
              path="/tasks/create"
              element={<CreateTask />}
            />
          </Route>

          {/* Projects - All roles */}
          <Route
            path="/projects"
            element={<Projects />}
          />

          {/* Tasks - All roles */}
          <Route
            path="/tasks"
            element={<Tasks />}
          />

          {/* Register - Admin only */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["admin"]}
              />
            }
          >
            <Route
              path="/admin/register"
              element={<Register />}
            />
          </Route>

        </Route>

      </Route>

      {/* Unauthorized */}
      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
};

export default AppRoutes;