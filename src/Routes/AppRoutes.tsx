import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Unauthorized from "../pages/Unauthorized";

import ProtectedRoute from "../components/ProtectedRoute";
import Admin from "../pages/Admin";
import Manager from "../pages/Manager";
import Developer from "../pages/Developer";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public */}
            <Route
                path="/login"
                element={<Login />}
            />

            {/* Admin */}
            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["admin"]}
                    />
                }
            >
                <Route
                    path="/admin"
                    element={<Admin />}
                />

                <Route
                    path="/admin/register"
                    element={<Register />}
                />
            </Route>

            {/* Manager */}
            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["manager"]}
                    />
                }
            >
                <Route
                    path="/manager"
                    element={<Manager />}
                />
            </Route>

            {/* Developer */}
            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["developer"]}
                    />
                }
            >
                <Route
                    path="/developer"
                    element={<Developer />}
                />
            </Route>

            <Route
                path="/unauthorized"
                element={<Unauthorized />}
            />

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>
    );
};

export default AppRoutes;