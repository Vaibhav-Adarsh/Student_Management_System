import {
  LayoutDashboard,
  Users,
  ClipboardList,
  ChartNoAxesCombined,
  Settings,
} from "lucide-react";

import type { NavigationItem } from "../types/navigationItem";

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Students",
    icon: Users,
    path: "/students",
  },
  {
    label: "Results",
    icon: ClipboardList,
    path: "/results",
  },
  {
    label: "Analytics",
    icon: ChartNoAxesCombined,
    path: "/analytics",
  },

  {
    label: "Attendance",
    icon: Users,
    path: "/attendance"
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];