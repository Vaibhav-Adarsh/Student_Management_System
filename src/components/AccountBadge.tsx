import { ChevronDown } from "lucide-react";

function AccountBadge() {
  const name = localStorage.getItem("settings.profileName")?.trim() || "Admin User";
  const email =
    localStorage.getItem("settings.profileEmail") || "admin@edumanage.com";
  const photo = localStorage.getItem("settings.profilePhoto");
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="flex min-w-0 items-center gap-2.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 shadow-sm"
      role="group"
      aria-label="Signed-in profile"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#dfe3ff] text-xs font-semibold text-[#3b4bc7]">
        {photo ? (
          <img src={photo} alt="" className="h-full w-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="min-w-0">
        <p className="max-w-[150px] truncate text-sm font-medium text-slate-700">
          {name}
        </p>
        <p className="max-w-[170px] truncate text-[0.68rem] leading-tight text-slate-500">
          {email}
        </p>
      </div>
      <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
    </div>
  );
}

export default AccountBadge;
