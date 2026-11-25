
import { useStudents } from "../context/StudentContext";
import {
  Bell,
  CircleCheck,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import AccountBadge from "../components/AccountBadge";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Analytics() {
  const { students } = useStudents();

  // 1. Summary Card Calculations

  const totalStudents = students.length;

  const totalMarks = students.reduce(
    (sum, student) => sum + student.marks,
    0
  );

  const averageMarks =
    totalStudents === 0 ? 0 : totalMarks / totalStudents;

  const highestMarks =
    totalStudents === 0
      ? 0
      : Math.max(...students.map((student) => student.marks));

  const passedStudents = students.filter(
    (student) => student.marks >= 40
  );

  const passPercentage =
    totalStudents === 0
      ? 0
      : (passedStudents.length / totalStudents) * 100;


  // 2. Marks Distribution

  const marksDistribution = [
    {
      range: "0-40",
      count: students.filter(
        (student) => student.marks <= 40
      ).length,
    },
    {
      range: "41-60",
      count: students.filter(
        (student) => student.marks > 40 && student.marks <= 60
      ).length,
    },
    {
      range: "61-80",
      count: students.filter(
        (student) => student.marks > 60 && student.marks <= 80
      ).length,
    },
    {
      range: "81-100",
      count: students.filter(
        (student) => student.marks > 80 && student.marks <= 100
      ).length,
    },
  ];


  // 3. Get Unique Courses

  const courses = [
    ...new Set(students.map((student) => student.course)),
  ];


  // 4. Course Performance

  const coursePerformance = courses.map((course) => {
    const courseStudents = students.filter(
      (student) => student.course === course
    );

    const total = courseStudents.reduce(
      (sum, student) => sum + student.marks,
      0
    );

    const average =
      courseStudents.length === 0
        ? 0
        : total / courseStudents.length;

    return {
      course,
      average: Number(average.toFixed(1)),
    };
  });


  // 5. Course Distribution

  const courseDistribution = courses.map((course) => {
    const count = students.filter(
      (student) => student.course === course
    ).length;

    const percentage =
      totalStudents === 0
        ? 0
        : (count / totalStudents) * 100;

    return {
      course,
      count,
      percentage: Number(percentage.toFixed(1)),
    };
  });


  // 6. Top Performers

  const topPerformers = [...students]
    .sort((a, b) => b.marks - a.marks)
    .slice(0, 5);


  // 7. Grade Calculation

  function getGrade(marks: number) {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";

    return "F";
  }

  const stats = [
    {
      label: "Total Students",
      value: String(totalStudents),
      detail: "Registered students",
      icon: Users,
      iconClass: "bg-[#ede9fe] text-[#6d5efc]",
    },
    {
      label: "Average Marks",
      value: averageMarks.toFixed(1),
      detail: "Across all students",
      icon: TrendingUp,
      iconClass: "bg-[#dbeafe] text-[#3b82f6]",
    },
    {
      label: "Highest Marks",
      value: String(highestMarks),
      detail: "Top score",
      icon: Trophy,
      iconClass: "bg-[#fef3dd] text-[#d59a12]",
    },
    {
      label: "Pass Percentage",
      value: `${passPercentage.toFixed(0)}%`,
      detail: "Passing marks: 40+",
      icon: CircleCheck,
      iconClass: "bg-[#dcfce7] text-[#22c55e]",
    },
  ];

  const chartColors = ["#7657E8", "#3196F5", "#19B77A", "#F59E0B"];
  const coursePillColors = [
    "bg-[#f3e8ff] text-[#7c3aed]",
    "bg-[#dbeafe] text-[#2563eb]",
    "bg-[#dcfce7] text-[#16a34a]",
    "bg-[#fef3c7] text-[#b45309]",
  ];

  // 8. JSX

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
          Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track student performance and academic insights.
        </p>
      </div>

      <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, detail, icon: Icon, iconClass }) => (
          <div
            key={label}
            className="flex min-h-[104px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm shadow-slate-200/40"
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
              <Icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-600">{label}</p>
              <p className="mt-0.5 text-2xl font-bold leading-tight tracking-tight text-slate-800">
                {value}
              </p>
              <p className="mt-1 text-xs text-slate-400">{detail}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mb-7">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">Performance Overview</h2>
          <p className="mt-1 text-sm text-slate-500">
            A breakdown of marks and average scores by course.
          </p>
        </div>
        <div className="grid min-w-0 gap-4 lg:grid-cols-2">
          <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40">
            <div className="mb-3">
              <h3 className="text-sm font-bold text-slate-800">Marks Distribution</h3>
              <p className="mt-1 text-xs text-slate-500">Number of students by score range</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={marksDistribution} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="#e9edf3" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="range"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  dy={8}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0", fontSize: 12 }}
                />
                <Bar dataKey="count" name="Students" fill={chartColors[0]} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </article>

          <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40">
            <div className="mb-3">
              <h3 className="text-sm font-bold text-slate-800">Course Performance</h3>
              <p className="mt-1 text-xs text-slate-500">Average marks for each course</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={coursePerformance} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="#e9edf3" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="course"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  dy={8}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0", fontSize: 12 }}
                />
                <Bar dataKey="average" name="Average marks" fill="#3196F5" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </article>
        </div>
      </section>

      <section className="mb-7 grid min-w-0 gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40">
          <div className="mb-1">
            <h2 className="text-base font-bold text-slate-800">Course Distribution</h2>
            <p className="mt-1 text-xs text-slate-500">Students enrolled in each course</p>
          </div>
          {students.length === 0 ? (
            <div className="flex h-[280px] items-center justify-center text-sm text-slate-400">
              No course data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={courseDistribution}
                  dataKey="count"
                  nameKey="course"
                  cx="50%"
                  cy="46%"
                  innerRadius={54}
                  outerRadius={88}
                  paddingAngle={3}
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell key={entry.course} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0", fontSize: 12 }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={30}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11, color: "#64748b" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </article>

        <article className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-bold text-slate-800">Top Performers</h2>
            <p className="mt-1 text-xs text-slate-500">The five highest-scoring students</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-left">
              <thead className="bg-[#f1f4f8]">
                <tr className="h-10 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  <th className="px-4">Rank</th>
                  <th className="px-4">Student</th>
                  <th className="px-4">Course</th>
                  <th className="px-4">Marks</th>
                  <th className="px-4">Grade</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">
                      No student data available.
                    </td>
                  </tr>
                ) : (
                  topPerformers.map((student, index) => (
                    <tr
                      key={student.rollNumber}
                      className="h-[58px] border-t border-slate-100 text-sm text-slate-700"
                    >
                      <td className="px-4">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1edff] text-xs font-bold text-[#6d5efc]">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-4 font-medium text-slate-800">{student.name}</td>
                      <td className="px-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${coursePillColors[courses.indexOf(student.course) % coursePillColors.length]}`}>
                          {student.course}
                        </span>
                      </td>
                      <td className="px-4 font-semibold text-slate-800">{student.marks}</td>
                      <td className="px-4">
                        <span
                          className={`inline-flex min-w-10 justify-center rounded-full px-2 py-1 text-xs font-semibold ${
                            student.marks >= 80
                              ? "bg-[#dcfce7] text-[#15803d]"
                              : student.marks >= 40
                                ? "bg-[#fef3c7] text-[#b45309]"
                                : "bg-[#fee2e2] text-[#b91c1c]"
                          }`}
                        >
                          {getGrade(student.marks)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Analytics;
