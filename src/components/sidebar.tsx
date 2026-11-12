import {
  ChartNoAxesCombined,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  ClipboardList,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Students", path: "/students", icon: Users },
  { label: "Results", path: "/results", icon: ClipboardList },
  { label: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
];

function Sidebar() {
  return (
    <aside className="flex w-[250px] shrink-0 flex-col border-r border-slate-200 bg-[#f0f2f5] p-5">
      <div className="mb-8 flex items-center gap-3 px-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4f46e5] text-white">
          <GraduationCap size={18} />
        </div>
        <div className="text-[1rem] font-bold tracking-[-0.04em] text-slate-800">
          EduManage
        </div>
      </div>

      <nav className="flex-1">
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.98rem] font-medium transition ${
                    isActive
                      ? "bg-[#e9ecff] text-[#4f46e5]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }`
                }
              >
                <Icon size={17} className="stroke-[2.1]" />
                {item.label}
              </NavLink>
            );
          })}
        </div>

        <div className="mt-9 space-y-1.5 border-t border-slate-200 pt-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[0.98rem] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <Settings size={17} className="stroke-[2.1]" />
            Settings
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[0.98rem] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <LogOut size={17} className="stroke-[2.1]" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}

export { Sidebar };
