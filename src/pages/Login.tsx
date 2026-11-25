import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  GraduationCap,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import type { UserProfile } from "../types/profile";

type LoginProps = {
  onSignIn: (profile: UserProfile) => void;
  onBackToDashboard: () => void;
};

function Login({ onSignIn, onBackToDashboard }: LoginProps) {
  const [name, setName] = useState(
    () => localStorage.getItem("settings.profileName") ?? ""
  );
  const [email, setEmail] = useState(
    () => localStorage.getItem("settings.profileEmail") ?? ""
  );
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setNameError("Enter your full name.");
      return;
    }

    setNameError("");
    onSignIn({ name: name.trim(), email: email.trim() });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#dfe4eb] p-5">
      <section className="w-full max-w-[420px] rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/30">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4f46e5] text-white">
            <GraduationCap size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-800">
              EduManage
            </h1>
            <p className="text-xs text-slate-500">Student Management System</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Sign in to continue to your dashboard.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-slate-700">
            Full name
            <span className="relative mt-1.5 block">
              <UserRound
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setNameError("");
                }}
                placeholder="Your name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-[#f9fafb] pl-10 pr-3 text-sm font-normal text-slate-800 outline-none transition focus:border-[#a5a9f8] focus:ring-2 focus:ring-[#4f46e5]/10"
              />
            </span>
            {nameError && (
              <span className="mt-1 block text-xs font-medium text-red-600" role="alert">
                {nameError}
              </span>
            )}
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Email address
            <span className="relative mt-1.5 block">
              <Mail
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                className="h-11 w-full rounded-xl border border-slate-200 bg-[#f9fafb] pl-10 pr-3 text-sm font-normal text-slate-800 outline-none transition focus:border-[#a5a9f8] focus:ring-2 focus:ring-[#4f46e5]/10"
              />
            </span>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Password
            <span className="relative mt-1.5 block">
              <LockKeyhole
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter any demo password"
                className="h-11 w-full rounded-xl border border-slate-200 bg-[#f9fafb] pl-10 pr-3 text-sm font-normal text-slate-800 outline-none transition focus:border-[#a5a9f8] focus:ring-2 focus:ring-[#4f46e5]/10"
              />
            </span>
          </label>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-[#4f46e5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4338ca] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f46e5]"
          >
            Sign in
          </button>
        </form>

        <button
          type="button"
          onClick={onBackToDashboard}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
        >
          <ArrowLeft size={15} />
          Back to dashboard
        </button>

        <p className="mt-5 rounded-xl bg-[#f8fafc] px-3 py-2.5 text-xs leading-relaxed text-slate-500">
          Demo sign-in only. Credentials are not checked by a server, and this
          screen does not provide production authentication.
        </p>
      </section>
    </main>
  );
}

export default Login;
