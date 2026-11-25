import { useState } from "react";
import { useStudents } from "../context/StudentContext";
import {
  BarChart3,
  Bell,
  CircleCheck,
  CircleX,
  Download,
  Search,
  Trophy,
  Users,
} from "lucide-react";
import AccountBadge from "../components/AccountBadge";

function Result() {
  const { students } = useStudents();
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedResult, setSelectedResult] = useState("All Results");

  const courses = Array.from(
    new Set(students.map((student) => student.course).filter(Boolean))
  );

  const totalStudents = students.length;
  const passStudents = students.filter(
    (student) => student.marks >= 40
  );

  const failedStudents = students.filter(
    (student) => student.marks < 40
  );

  const passPercentage = totalStudents === 0
    ? 0
    : Math.round((passStudents.length / totalStudents) * 100);

  function getGrade(marks: number) {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";
    return "F";
  }

  function handleDownloadReport(){
    const headers = [

        "Roll Number",
        "Student Name",
        "Course",
        "Marks",
        "Result",
        "Grade"
    ];

    const rows = filteredStudents.map((student) => [
        student.rollNumber,
        student.name,
        student.course,
        student.marks,
        student.marks >= 40 ? "Pass" : "Fail",
        getGrade(student.marks)
    ]);
    const csvContent = [
      headers.join(","),...rows.map((row) => row.join(","))].join("\n");
    
      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "student-results.csv";

    link.click();

    URL.revokeObjectURL(url);
}

  const filteredStudents = students.filter((student) => {
    const searchValue = search.toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(searchValue) ||
      String(student.rollNumber).includes(search);

    const matchesCourse =
      selectedCourse === "All Courses" ||
      student.course === selectedCourse;

    const matchesResult =
      selectedResult === "All Results" ||
      (selectedResult === "Pass" && student.marks >= 40) ||
      (selectedResult === "Fail" && student.marks < 40);

    return matchesSearch && matchesCourse && matchesResult;
  });

  return (
    <div className="h-full overflow-y-auto bg-[#f5f7fa] px-7 py-6">
      <header className="mb-6 flex h-10 items-start justify-end gap-3">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>
        <AccountBadge />
      </header>

      <div className="mb-6">
        <h1 className="text-[2.25rem] font-bold tracking-[-0.05em] text-slate-800">Results</h1>
        <p className="mt-1 text-sm text-slate-500">View and manage student results</p>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: totalStudents, icon: Users, iconClass: "bg-[#ede9fe] text-[#6d5efc]" },
          { label: "Pass Count", value: passStudents.length, icon: CircleCheck, iconClass: "bg-[#dcfce7] text-[#22c55e]" },
          { label: "Fail Count", value: failedStudents.length, icon: CircleX, iconClass: "bg-[#fee2e2] text-[#ef4444]" },
          { label: "Pass Percentage", value: `${passPercentage}%`, icon: BarChart3, iconClass: "bg-[#dbeafe] text-[#3b82f6]" },
        ].map(({ label, value, icon: Icon, iconClass }) => (
          <div key={label} className="flex h-[92px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}>
              <Icon size={21} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">{label}</p>
              <p className="mt-0.5 text-2xl font-bold leading-tight text-slate-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 flex items-center gap-3">
        <label className="relative w-full max-w-[290px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-[#f9fafb] pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#c3c9d8] focus:outline-none"
          />
        </label>

        <select
          value={selectedCourse}
          onChange={(event) => setSelectedCourse(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none"
        >
          <option value="All Courses">All Courses</option>
          {courses.map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>

        <select
          value={selectedResult}
          onChange={(event) => setSelectedResult(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none"
        >
          <option value="All Results">All Results</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>

        <button
          type="button"
          onClick={handleDownloadReport}
          disabled={filteredStudents.length === 0}
          className="ml-auto flex h-11 items-center gap-2 rounded-xl bg-[#4f46e5] px-4 text-sm font-semibold text-white transition hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={16} />
          Download Report
        </button>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex h-[58px] items-center gap-2 border-b border-slate-100 px-5">
          <Trophy size={18} className="text-[#4f46e5]" />
          <h2 className="text-base font-bold text-slate-800">Student Results</h2>
        </div>

        <table className="w-full border-collapse text-left">
          <thead className="bg-[#eef1f6]">
            <tr className="h-11 text-xs font-bold text-slate-700">
              <th className="px-5">Roll Number</th>
              <th className="px-5">Student Name</th>
              <th className="px-5">Course</th>
              <th className="px-5">Marks</th>
              <th className="px-5">Result</th>
              <th className="px-5">Grade</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.rollNumber} className="h-[58px] border-t border-slate-100 text-sm text-slate-700">
                  <td className="px-5">{student.rollNumber}</td>
                  <td className="px-5">{student.name}</td>
                  <td className="px-5">{student.course}</td>
                  <td className="px-5">{student.marks}</td>
                  <td className="px-5">
                    {student.marks >= 40 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-2.5 py-1 text-xs font-semibold text-[#15803d]">
                        <CircleCheck size={13} />
                        Pass
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fee2e2] px-2.5 py-1 text-xs font-semibold text-[#dc2626]">
                        <CircleX size={13} />
                        Fail
                      </span>
                    )}
                  </td>
                  <td className="px-5 font-medium">{getGrade(student.marks)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-500">
                  No result found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Result;