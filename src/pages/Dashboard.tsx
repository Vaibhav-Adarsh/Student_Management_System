
import { useState } from "react";
import {
  Bell,
  BookOpen,
  ChevronDown,
  PencilLine,
  Plus,
  Search,
  Trash2,
  Trophy,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Student } from "../types/student";
import { useStudents } from "../context/StudentContext";

const courseStyleMap: Record<string, string> = {
  BCA: "bg-[#f3e8ff] text-[#7c3aed]",
  "B.Sc": "bg-[#dbeafe] text-[#2563eb]",
  MBA: "bg-[#dcfce7] text-[#16a34a]",
  default: "bg-slate-200 text-slate-700",
};

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [marks, setMarks] = useState<number>(0);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const { students, setStudents } = useStudents();

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const totalStudents = students.length;
  const activeCourses = new Set(
    students.map((student) => student.course.trim().toLowerCase()).filter(Boolean)
  ).size;
  const averageMarks = totalStudents
    ? (students.reduce((sum, student) => sum + student.marks, 0) / totalStudents).toFixed(1)
    : "0.0";
  const topScore = totalStudents
    ? Math.max(...students.map((student) => student.marks))
    : 0;

  const stats = [
    { label: "Total Students", value: String(totalStudents), icon: Users, tint: "bg-[#f1ebfe] text-[#6d5efc]" },
    { label: "Active Courses", value: String(activeCourses), icon: BookOpen, tint: "bg-[#e5f9eb] text-[#1ea76b]" },
    { label: "Average Marks", value: `${averageMarks}%`, icon: TrendingUp, tint: "bg-[#dfeafb] text-[#3d5fe4]" },
    { label: "Top Score", value: `${topScore}%`, icon: Trophy, tint: "bg-[#fef3dd] text-[#d59a12]" },
  ];

  const resetForm = () => {
    setName("");
    setAge(0);
    setEmail("");
    setCourse("");
    setMarks(0);
    setError("");
    setEditingId(null);
  };

  function handleAddStudent() {
    if (name.trim() === "" || email.trim() === "") {
      setError("Name and Email are Required");
      return;
    }

    if (marks < 0 || marks > 100) {
      setError("Marks must be between 0 and 100");
      return;
    }

    if (age <= 0) {
      setError("Please enter a valid age");
      return;
    }

    setError("");

    const newStudent: Student = {
      rollNumber: editingId ?? Date.now(),
      name: name.trim(),
      age,
      email: email.trim(),
      course: course.trim(),
      marks,
    };

    if (editingId !== null) {
      setStudents((prevStudents) =>
        prevStudents.map((student) => (student.rollNumber === editingId ? newStudent : student))
      );
    } else {
      setStudents((prevStudents) => [...prevStudents, newStudent]);
    }

    resetForm();
    setIsOpen(false);
  }

  function handleDeleteStudent(id: number) {
    setStudents((prevStudents) => prevStudents.filter((student) => student.rollNumber !== id));
  }

  function handleEditStudent(id: number) {
    const student = students.find((entry) => entry.rollNumber === id);

    if (!student) return;

    setName(student.name);
    setAge(student.age);
    setEmail(student.email);
    setCourse(student.course);
    setMarks(student.marks);
    setEditingId(id);
    setError("");
    setIsOpen(true);
  }

  return (
    <div className="flex h-full flex-col bg-[#f5f7fa] px-6 py-5">
      <header className="mb-7 flex items-center justify-between gap-5">
        <div className="relative w-full max-w-[430px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search anything..."
            className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8f9fb] pl-11 pr-4 text-[0.96rem] text-slate-700 placeholder:text-slate-400 focus:border-[#c3c9d8] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            aria-label="Notifications"
          >
            <Bell size={16} />
          </button>

          <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dfe3ff] text-xs font-semibold text-[#3b4bc7]">
              A
            </div>
            <span className="text-[0.96rem] font-medium text-slate-700">Admin</span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </div>
        </div>
      </header>

      <div className="mb-7 flex items-start justify-between gap-5">
        <div>
          <h1 className="text-[2.5rem] font-bold tracking-[-0.05em] text-slate-800">Students</h1>
          <p className="mt-1 text-[1rem] text-slate-500">Manage and organize your students.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-[#4f46e5] px-4 py-2.5 text-[0.95rem] font-semibold text-white transition hover:bg-[#4338ca]"
        >
          <Plus size={16} />
          Add Student
        </button>
      </div>

      <div className="mb-7 grid gap-4 md:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tint }) => (
          <div key={label} className="flex items-center gap-3 rounded-[16px] border border-slate-200 bg-[#f8fafb] px-4 py-3.5">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tint}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-[0.82rem] font-medium text-slate-600">{label}</p>
              <h2 className="mt-0.5 text-[1.8rem] font-bold tracking-[-0.05em] text-slate-800">{value}</h2>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-[18px] border border-slate-200 bg-[#f5f6f8] p-1">
        <div className="flex items-center justify-between gap-4 px-4 py-3.5">
          <div>
            <h2 className="text-[1rem] font-bold text-slate-800">All Students</h2>
            <p className="mt-1 text-[0.9rem] text-slate-500">View and manage student records.</p>
          </div>

          <label className="relative block w-full max-w-[290px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search students..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-[0.92rem] text-slate-700 placeholder:text-slate-400 focus:border-[#c3c9d8] focus:outline-none"
            />
          </label>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white">
          <table className="min-w-full border-separate border-spacing-0">
            <thead className="bg-[#f1f4f8] text-left">
              <tr>
                {['Roll Number', 'Student Name', 'Email', 'Course', 'Marks', 'Actions'].map((header) => (
                  <th key={header} className="px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500">No students found.</td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.rollNumber} className="border-t border-slate-200 text-[0.98rem] text-slate-700">
                    <td className="px-5 py-4 font-medium text-slate-700">{student.rollNumber}</td>
                    <td className="px-5 py-4 font-medium text-slate-800">{student.name}</td>
                    <td className="px-5 py-4 text-slate-600">{student.email}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-sm font-medium ${courseStyleMap[student.course] ?? courseStyleMap.default}`}>
                        {student.course}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex min-w-[3.25rem] items-center justify-center rounded-full px-2 py-1 text-sm font-semibold ${student.marks >= 80 ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#fee2e2] text-[#b91c1c]"}`}>
                        {student.marks}%
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleEditStudent(student.rollNumber)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#4f46e5] transition hover:bg-slate-50"
                          aria-label={`Edit ${student.name}`}
                        >
                          <PencilLine size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteStudent(student.rollNumber)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition hover:bg-red-100"
                          aria-label={`Delete ${student.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-[1.7rem] font-bold tracking-[-0.04em] text-slate-800">
                {editingId !== null ? "Edit Student" : "Add a New Student"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setIsOpen(false);
                }}
                className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-slate-600">Student Name</span>
                <input
                  type="text"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-700 outline-none focus:border-slate-300"
                  placeholder="Enter Student Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>

              <label>
                <span className="mb-1.5 block text-sm font-medium text-slate-600">Student Age</span>
                <input
                  type="number"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-700 outline-none focus:border-slate-300"
                  placeholder="Age"
                  value={age}
                  onChange={(event) => setAge(Number(event.target.value))}
                />
              </label>

              <label>
                <span className="mb-1.5 block text-sm font-medium text-slate-600">Student Marks</span>
                <input
                  type="number"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-700 outline-none focus:border-slate-300"
                  placeholder="Marks"
                  value={marks}
                  onChange={(event) => setMarks(Number(event.target.value))}
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-slate-600">Course</span>
                <input
                  type="text"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-700 outline-none focus:border-slate-300"
                  placeholder="Enter Student Course"
                  value={course}
                  onChange={(event) => setCourse(event.target.value)}
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-slate-600">Email</span>
                <input
                  type="email"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-700 outline-none focus:border-slate-300"
                  placeholder="Enter Student Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
            </div>

            {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setIsOpen(false);
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAddStudent}
                className="rounded-xl bg-[#4f46e5] px-4 py-2.5 font-medium text-white transition hover:bg-[#4338ca]"
              >
                {editingId !== null ? "Update Student" : "Save Student"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
