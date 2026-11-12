import { Routes, Route } from "react-router-dom";

import { Sidebar } from "./components/sidebar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Student";
import Results from "./pages/Results";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <div className="min-h-screen bg-[#dfe4eb] p-6">
      <div className="mx-auto flex h-[760px] max-w-[1220px] overflow-hidden rounded-[26px] border border-slate-200 bg-[#f4f6f9] shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
        <Sidebar />

        <main className="flex-1 overflow-hidden bg-[#f5f7fa]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/results" element={<Results />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
