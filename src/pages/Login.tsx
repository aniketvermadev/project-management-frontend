import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    try {
      const user = await login(email, password);

      if (user?.role === "admin") {
        navigate("/admin");
      } else if (user?.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/developer");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">

        {/* ================= LEFT SIDE ================= */}

        <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">

          {/* Background circles */}
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/10" />

          <div className="absolute -bottom-80 -left-60 h-[700px] w-[700px] rounded-full border border-white/10" />

          <div className="absolute right-20 top-1/3 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

          {/* Logo */}

          <div className="relative flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-lg font-bold shadow-lg shadow-indigo-500/30">
              A
            </div>

            <span className="text-xl font-bold">
              AdminPanel
            </span>
          </div>

          {/* Content */}

          <div className="relative max-w-xl">

            <p className="mb-5 text-xs font-bold tracking-[0.25em] text-indigo-300">
              WELCOME BACK
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight xl:text-6xl">
              Manage your team.
              <br />
              <span className="text-indigo-300">
                Build better.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-indigo-200">
              A simple and powerful workspace for admins,
              managers, and developers to collaborate and
              manage projects.
            </p>

            {/* Features */}

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3 text-sm text-indigo-100">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-400/20 text-xs text-indigo-300">
                  ✓
                </div>

                <span>Role-based access control</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-indigo-100">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-400/20 text-xs text-indigo-300">
                  ✓
                </div>

                <span>Secure authentication</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-indigo-100">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-400/20 text-xs text-indigo-300">
                  ✓
                </div>

                <span>Team management</span>
              </div>

            </div>
          </div>

          {/* Footer */}

          <p className="relative text-xs text-indigo-400">
            © 2026 AdminPanel. All rights reserved.
          </p>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-5 py-10 lg:w-1/2 lg:px-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}

            <div className="mb-12 flex items-center justify-center gap-3 lg:hidden">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
                A
              </div>

              <span className="text-xl font-bold text-slate-900">
                AdminPanel
              </span>

            </div>

            {/* Header */}

            <div className="mb-8">

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter your credentials to access your account.
              </p>

            </div>

            {/* Error */}

            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold">
                  !
                </div>

                <span>{error}</span>

              </div>
            )}

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">

                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />

                      <path d="m3 7 9 6 9-6" />
                    </svg>

                  </div>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">

                    <svg
                      width="19"
                      height="19"
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

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-0"
              >
                <span>Sign in</span>

                <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;