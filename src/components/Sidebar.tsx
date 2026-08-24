import { NavLink } from "react-router-dom";
import { LogOut, ChevronRight } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { sidebarItems } from "../config/sidebar";

const Sidebar = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const items = sidebarItems[user.role];

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm">
            PM
          </div>

          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900">
              Project Manager
            </h1>

            <p className="text-xs text-slate-500">
              Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <p className="mb-3 px-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>

        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-indigo-600" />
                    )}

                    <Icon
                      size={19}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className={
                        isActive
                          ? "text-indigo-600"
                          : "text-slate-400 transition-colors group-hover:text-slate-600"
                      }
                    />

                    <span className="flex-1 text-left">
                      {item.label}
                    </span>

                    {isActive && (
                      <ChevronRight
                        size={15}
                        className="text-indigo-400"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-200 p-3">
        
        {/* User */}
        <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold text-slate-800">
              {user.name}
            </p>

            <p className="text-xs capitalize text-slate-500">
              {user.role}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut
            size={18}
            strokeWidth={1.8}
            className="transition-colors"
          />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;