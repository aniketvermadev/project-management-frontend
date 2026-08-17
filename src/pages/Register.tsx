import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState<
    "manager" | "developer"
  >("developer");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api.post("/users", {
        name,
        email,
        password,
        role,
      });

      navigate("/admin");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "User creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080b16]">

      {/* Background decoration */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      {/* Main */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[0.85fr_1.15fr]">

          {/* =========================================
              LEFT BRANDING
          ========================================== */}

          <div className="relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between">

            {/* Decorative circle */}

            <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-indigo-400/10" />

            <div className="absolute -right-12 top-32 h-48 w-48 rounded-full border border-indigo-400/10" />

            {/* Logo */}

            <div className="relative flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-violet-600 text-lg font-black text-white shadow-lg shadow-indigo-600/30">
                A
              </div>

              <div className="text-left">
                <p className="text-lg font-bold text-white">
                  AdminPanel
                </p>

                <p className="text-[11px] text-slate-500">
                  Team management
                </p>
              </div>

            </div>

            {/* Main content */}

            <div className="relative">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />

                <span className="text-[11px] font-semibold text-indigo-300">
                  ADMIN CONTROL
                </span>

              </div>

              <h1 className="max-w-md text-4xl font-bold leading-tight tracking-tight text-white">
                Build your team
                <span className="block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  one member at a time.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
                Create accounts, assign roles and give
                your team the right level of access.
              </p>

              {/* Stats */}

              <div className="mt-8 grid grid-cols-2 gap-3">

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">

                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M19 8v6" />
                      <path d="M22 11h-6" />
                    </svg>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    Add members
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Quickly onboard your team
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">

                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect
                        x="4"
                        y="10"
                        width="16"
                        height="11"
                        rx="2"
                      />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    Secure access
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Role-based permissions
                  </p>

                </div>

              </div>

            </div>

            {/* Footer */}

            <div className="flex items-center gap-2 text-xs text-slate-600">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              Admin workspace is secure

            </div>

          </div>

          {/* =========================================
              FORM
          ========================================== */}

          <div className="bg-white px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">

            {/* Mobile logo */}

            <div className="mb-8 flex items-center justify-between lg:hidden">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white">
                  A
                </div>

                <span className="font-bold text-slate-900">
                  AdminPanel
                </span>

              </div>

            </div>

            {/* Top */}

            <div className="mb-8 flex items-start justify-between">

              <div className="text-left">
                <h2 className="text-3xl mb-0 font-bold tracking-tight text-slate-900">
                  Create a user
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Add a new member to your organization.
                </p>

              </div>

              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="hidden h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:flex"
              >
                <span>←</span>
                Dashboard
              </button>

            </div>

            {/* Error */}

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                  !
                </div>

                <div>
                  <p className="text-xs font-bold text-red-700">
                    Something went wrong
                  </p>

                  <p className="mt-0.5 text-xs text-red-600">
                    {error}
                  </p>
                </div>

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name + Email */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Name */}

                <div className="text-left">

                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

                {/* Email */}

                <div className="text-left">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-xs font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <span className="text-[10px] font-medium text-slate-400">
                    Minimum 6 characters
                  </span>

                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  minLength={6}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />

              </div>

              {/* Role */}

              <div>

                <div className="mb-3 text-left">

                  <p className="text-xs font-bold text-slate-700">
                    Assign role
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Choose what this user will have access to.
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-3">

                  {/* Developer */}

                  <button
                    type="button"
                    onClick={() =>
                      setRole("developer")
                    }
                    className={`group relative rounded-2xl border p-4 text-left transition ${
                      role === "developer"
                        ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/10"
                        : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50"
                    }`}
                  >

                    {role === "developer" && (
                      <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                        ✓
                      </div>
                    )}

                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                        role === "developer"
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >

                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="m8 9-4 3 4 3" />
                        <path d="m16 9 4 3-4 3" />
                        <path d="m14 5-4 14" />
                      </svg>

                    </div>

                    <p className="text-sm font-bold text-slate-900">
                      Developer
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      Build features and manage code.
                    </p>

                  </button>

                  {/* Manager */}

                  <button
                    type="button"
                    onClick={() =>
                      setRole("manager")
                    }
                    className={`group relative rounded-2xl border p-4 text-left transition ${
                      role === "manager"
                        ? "border-violet-500 bg-violet-50 ring-2 ring-violet-500/10"
                        : "border-slate-200 bg-white hover:border-violet-200 hover:bg-slate-50"
                    }`}
                  >

                    {role === "manager" && (
                      <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                        ✓
                      </div>
                    )}

                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                        role === "manager"
                          ? "bg-violet-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >

                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="12" cy="8" r="3" />
                        <path d="M5 21a7 7 0 0 1 14 0" />
                        <path d="M19 8v5" />
                        <path d="M21.5 10.5h-5" />
                      </svg>

                    </div>

                    <p className="text-sm font-bold text-slate-900">
                      Manager
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      Manage teams and oversee projects.
                    </p>

                  </button>

                </div>

              </div>

              {/* Security info */}

              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="11"
                      rx="2"
                    />

                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>

                </div>

                <div>

                  <p className="text-xs text-left font-semibold text-slate-700">
                    Secure account creation
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Only administrators can create new users.
                  </p>

                </div>

              </div>

              {/* Buttons */}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="h-12 rounded-xl border border-slate-200 px-6 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />

                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>

                      Creating...

                    </>
                  ) : (
                    <>
                      Create user

                      <span className="text-lg transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;