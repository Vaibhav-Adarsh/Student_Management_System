import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { Sidebar } from "./components/sidebar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Student";
import Results from "./pages/Results";
import Analytics from "./pages/Analytics";
import Settings, { type ThemePreference } from "./pages/settings";
import Login from "./pages/Login";
import type { UserProfile } from "./types/profile";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("session.signedIn") !== "false"
  );
  const [theme, setTheme] = useState<ThemePreference>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" || savedTheme === "system"
      ? savedTheme
      : "light";
  });

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const isDark =
        theme === "dark" || (theme === "system" && systemTheme.matches);

      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    };

    applyTheme();
    localStorage.setItem("theme", theme);

    if (theme !== "system") return;

    systemTheme.addEventListener("change", applyTheme);
    return () => systemTheme.removeEventListener("change", applyTheme);
  }, [theme]);

  function handleLogout() {
    localStorage.setItem("session.signedIn", "false");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }

  function handleEnterDashboard() {
    localStorage.setItem("session.signedIn", "true");
    setIsAuthenticated(true);
    navigate("/", { replace: true });
  }

  function handleLogin(profile: UserProfile) {
    localStorage.setItem("settings.profileName", profile.name);
    localStorage.setItem("settings.profileEmail", profile.email);
    handleEnterDashboard();
  }

  if (!isAuthenticated) {
    return (
      <Login
        onSignIn={handleLogin}
        onBackToDashboard={handleEnterDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#dfe4eb] p-6">
      <div className="mx-auto flex h-[760px] max-w-[1220px] overflow-hidden rounded-[26px] border border-slate-200 bg-[#f4f6f9] shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
        <Sidebar onLogout={handleLogout} />

        <main className="flex-1 overflow-hidden bg-[#f5f7fa]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/results" element={<Results />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route
              path="/settings"
              element={<Settings theme={theme} onThemeChange={setTheme} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
