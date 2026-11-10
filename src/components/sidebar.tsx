import {
  LayoutDashboard,
  Users,
  ClipboardList,
  ChartNoAxesCombined,
  Settings,
  GraduationCap,
} from "lucide-react";
import { navigationItems } from "../data/navigation";
import { NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <aside className="flex w-[320px] shrink-0 flex-col border-r border-slate-200 bg-[#eef1f6] px-6 py-7">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4f46e5] text-white shadow-[0_8px_18px_rgba(79,70,229,0.3)]">
          <GraduationCap size={22} />
        </div>
        <div>
          <h1 className="text-[1.05rem] font-bold tracking-[-0.04em] text-slate-800">
            StudentMS
          </h1>
          <p className="text-xs text-slate-500">Management Portal</p>
        </div>
      </div>

      <nav className="flex-1">
        <p className="mb-4 px-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Menu
        </p>

        <div className="space-y-1.5">
            {navigationItems.map((item) => {
                const Icon = item.icon;

                return(
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                            `flex items-center-gap-3 rounded-xl px-3 py-2.5 text-[1.05rem]
                        font font-medium transition ${
                            isActive ? "bg-[#e9ecff] text-[#4F$6e5] " : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                        }`
                    }
                  >
                    <Icon size={18} className="stroke-[2.1]" />
                         {item.label}
                  </NavLink>
                );
            })}
            {/* {navigationItems.map((item) => {
                const Icon = item.icon;

                return(
                    <a
                        key={item.path}
                        href={item.path}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[1.05rem] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                        <Icon size={18} className="stroke-[2.1]" />
                        {item.label}
                    </a>
                );
            })} */}
          {/* <a
            href="#"
            className="flex items-center gap-3 rounded-xl bg-[#e9ecff] px-3 py-2.5 text-[1.05rem] font-medium text-[#4f46e5] shadow-[inset_0_0_0_1px_rgba(79,70,229,0.04)]"
          >
            <LayoutDashboard size={18} className="stroke-[2.1]" />
            Dashboard
          </a>

          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[1.05rem] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <Users size={18} className="stroke-[2.1]" />
            Students
          </a>

          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[1.05rem] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <ClipboardList size={18} className="stroke-[2.1]" />
            Results
          </a>

          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[1.05rem] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <ChartNoAxesCombined size={18} className="stroke-[2.1]" />
            Analytics
          </a>

        <p className="mb-4 mt-10 px-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
          General
        </p>

        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[1.05rem] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Settings size={18} className="stroke-[2.1]" />
          Settings
        </a> */}
        </div>
      </nav>
    </aside>
  );
}

export { Sidebar };
