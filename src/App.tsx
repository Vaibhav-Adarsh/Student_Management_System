import { Routes, Route } from "react-router-dom";

import { Sidebar } from "./components/sidebar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Student";
import Results from "./pages/Results";
import Analytics from "./pages/Analytics";


function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#dce1e8] p-6">
      <div className="flex h-[760px] w-full max-w-[1260px] overflow-hidden rounded-[30px] border border-slate-200 bg-[#f3f5f7] shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <Sidebar />

        <main className="flex-1 px-10 py-12">
          <Routes>
            <Route path="/"  element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/results" element={<Results />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
          <h1 className="mt-3 text-[2.25rem] font-medium tracking-[-0.04em] text-slate-800">
            Welcome back, Admin
          </h1>

          <p className="mt-4 text-[1.05rem] text-slate-500">
            Here's what's happening with your students today.
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;
