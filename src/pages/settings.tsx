import { useRef, useState, type ChangeEvent } from "react";
import {
  Bell,
  BellRing,
  Camera,
  Check,
  Info,
  Monitor,
  Moon,
  Palette,
  Sun,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import AccountBadge from "../components/AccountBadge";

export type ThemePreference = "light" | "dark" | "system";

type SettingsProps = {
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
};

function getStoredNotification(key: string, defaultValue: boolean) {
  const savedValue = localStorage.getItem(`settings.notification.${key}`);
  return savedValue === null ? defaultValue : savedValue === "true";
}

function Settings({ theme, onThemeChange }: SettingsProps) {
  const [name, setName] = useState(
    () => localStorage.getItem("settings.profileName") ?? "Admin User"
  );
  const [email, setEmail] = useState(
    () => localStorage.getItem("settings.profileEmail") ?? "admin@edumanage.com"
  );
  const [saved, setSaved] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [storageError, setStorageError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(
    () => localStorage.getItem("settings.profilePhoto")
  );
  const [photoError, setPhotoError] = useState("");
  const photoInputRef = useRef<HTMLInputElement>(null);
  const role = "Administrator";
  const [notifications, setNotifications] = useState({
    newStudent: getStoredNotification("newStudent", true),
    studentUpdates: getStoredNotification("studentUpdates", true),
    resultUpdates: getStoredNotification("resultUpdates", true),
    emailNotifications: getStoredNotification("emailNotifications", false),
  });

  function handleSaveProfile() {
    if (!name.trim()) {
      setProfileError("Enter your name before saving.");
      return;
    }

    try {
      localStorage.setItem("settings.profileName", name.trim());
      localStorage.setItem("settings.profileEmail", email.trim());
      setName(name.trim());
      setEmail(email.trim());
      setProfileError("");
      setSaved(true);
    } catch (error) {
      if (error instanceof DOMException) {
        setProfileError("Could not save profile settings in this browser.");
        return;
      }
      throw error;
    }
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Choose an image file.");
      return;
    }

    if (file.size > 1024 * 1024) {
      setPhotoError("Choose an image smaller than 1 MB.");
      return;
    }

    setPhotoError("");
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setPhotoError("The selected image could not be loaded.");
        return;
      }

      try {
        localStorage.setItem("settings.profilePhoto", reader.result);
        setProfilePhoto(reader.result);
        setPhotoError("");
      } catch (error) {
        if (error instanceof DOMException) {
          setPhotoError("Could not save this image. Browser storage may be full.");
          return;
        }
        throw error;
      }
    };
    reader.onerror = () => {
      setPhotoError("The selected image could not be loaded.");
    };
    reader.readAsDataURL(file);
  }

  function handleNotificationChange(key: keyof typeof notifications) {
    const nextValue = !notifications[key];

    try {
      localStorage.setItem(`settings.notification.${key}`, String(nextValue));
      setNotifications((previous) => ({
        ...previous,
        [key]: nextValue,
      }));
      setStorageError("");
    } catch (error) {
      if (error instanceof DOMException) {
        setStorageError("Could not save notification preferences in this browser.");
        return;
      }
      throw error;
    }
  }

  const themeOptions: { value: ThemePreference; label: string; icon: LucideIcon }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const notificationOptions = [
    {
      key: "newStudent",
      title: "New student",
      description: "When a new student is added.",
    },
    {
      key: "studentUpdates",
      title: "Student updates",
      description: "When student details are updated.",
    },
    {
      key: "resultUpdates",
      title: "Result updates",
      description: "When student results are changed.",
    },
    {
      key: "emailNotifications",
      title: "Email notifications",
      description: "Receive notifications through email.",
    },
  ] as const;

  return (
    <div className="h-full overflow-y-auto bg-[#f5f7fa] px-6 py-5">
      <header className="mb-6 flex items-center justify-end gap-3">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>
        <AccountBadge />
      </header>

      <div className="mb-6">
        <h1 className="text-[2.25rem] font-bold tracking-[-0.05em] text-slate-800">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account and application preferences.
        </p>
      </div>

      <section className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ede9fe] text-[#6d5efc]">
            <UserRound size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Profile Settings</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Update your personal information.
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-5 md:grid-cols-[200px_1fr]">
          <div className="flex items-center gap-4 md:flex-col md:items-start">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#e9ecff] text-lg font-bold text-[#4f46e5]">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={`${name}'s profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                "AU"
              )}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{name}</p>
              <p className="mt-0.5 text-xs text-slate-500">{role}</p>
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <Camera size={14} />
                Change photo
              </button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                aria-label="Choose profile photo"
              />
              {photoError && (
                <p className="mt-2 text-xs font-medium text-red-600" role="alert">
                  {photoError}
                </p>
              )}
            </div>
          </div>

          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              handleSaveProfile();
            }}
          >
            <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
              Full name
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setSaved(false);
                  setProfileError("");
                }}
                required
                className="h-10 rounded-xl border border-slate-200 bg-[#f9fafb] px-3 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#a5a9f8] focus:ring-2 focus:ring-[#4f46e5]/10"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
              Email address
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSaved(false);
                  setProfileError("");
                }}
                required
                className="h-10 rounded-xl border border-slate-200 bg-[#f9fafb] px-3 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#a5a9f8] focus:ring-2 focus:ring-[#4f46e5]/10"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-slate-600 sm:col-span-2">
              Role
              <input
                id="role"
                type="text"
                value={role}
                disabled
                className="h-10 rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm font-normal text-slate-500"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4338ca] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f46e5]"
              >
                Save changes
              </button>
              {saved && (
                <p className="inline-flex items-center gap-1.5 text-sm font-medium text-[#15803d]">
                  <Check size={16} />
                  Profile changes saved successfully.
                </p>
              )}
              {profileError && (
                <p className="text-sm font-medium text-red-600" role="alert">
                  {profileError}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>

      <div className="mb-5 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dbeafe] text-[#3b82f6]">
              <Palette size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Appearance</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Choose how EduManage looks on this device.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1">
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => onThemeChange(value)}
                aria-pressed={theme === value}
                className={`flex items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs font-semibold transition ${
                  theme === value
                    ? "bg-white text-[#4f46e5] shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Current theme: <span className="font-semibold capitalize text-slate-700">{theme}</span>
          </p>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fef3dd] text-[#d59a12]">
              <BellRing size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Notifications</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Choose which updates you want to receive.
              </p>
            </div>
          </div>

          <div className="px-5 pb-2">
            {notificationOptions.map(({ key, title, description }) => (
              <label
                key={key}
                className="flex cursor-pointer items-center justify-between gap-4 border-t border-slate-100 py-3.5"
              >
                <span>
                  <span className="block text-sm font-semibold text-slate-700">{title}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{description}</span>
                </span>
                <input
                  type="checkbox"
                  checked={notifications[key]}
                  onChange={() => handleNotificationChange(key)}
                  className="h-4 w-4 shrink-0 cursor-pointer accent-[#4f46e5]"
                />
              </label>
            ))}
          </div>
          {storageError && (
            <p className="px-5 pb-4 text-xs font-medium text-red-600" role="alert">
              {storageError}
            </p>
          )}
        </section>
      </div>

      <section className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5f9eb] text-[#1ea76b]">
            <Info size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">System Information</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              About your application and system details.
            </p>
          </div>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Application name", "EduManage"],
            ["Version", "1.0.0"],
            ["Frontend framework", "React + TypeScript"],
            ["Styling", "Tailwind CSS"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-[#f8fafc] p-3.5">
              <p className="text-xs font-medium text-slate-500">{label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
            </div>
          ))}
          <div className="rounded-xl bg-[#f8fafc] p-3.5 sm:col-span-2 lg:col-span-4">
            <p className="text-xs font-medium text-slate-500">About EduManage</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              EduManage helps administrators manage student records, results,
              and performance analytics.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;
