import { useState } from "react";
import { useStudents } from "../context/StudentContext";
import { Bell, Pencil, Save, Search, Trash2, Users, X } from "lucide-react";
import AccountBadge from "../components/AccountBadge";

function Student() {
    const { students,setStudents, handleDeleteStudents } = useStudents();
    const [search, setSearch] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null)
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [marks, setMarks] = useState("");


    const filteredStudents = students.filter((student) => {
        return(
            student.name.toLowerCase().includes(search.toLowerCase()) ||
            student.email.toLowerCase().includes(search.toLowerCase()) ||
            student.course.toLowerCase().includes(search.toLowerCase())
        );
    });

    function handleEditStudent(id: number){
        const student = students.find((entry) => entry.rollNumber === id);

        if(!student) return;
        
    setName(student.name);
    setAge(String(student.age));
    setEmail(student.email);
    setCourse(student.course);
    setMarks(String(student.marks));

    setEditingId(id);
    setIsEditing(true);
    }

 function handleUpdateStudent() {
    setStudents((prevStudents) =>
        prevStudents.map((student) =>
            student.rollNumber === editingId
                ? {
                    ...student,
                    name,
                    age: Number(age),
                    email,
                    course,
                    marks: Number(marks),
                }
                : student
        )
    );

    setIsEditing(false);
    setEditingId(null);
}

 function handleCancelEdit() {
        setIsEditing(false);
        setEditingId(null);
        setName("");
        setAge("");
        setEmail("");
        setCourse("");
        setMarks("");
    }

    return (
        <div className="h-full overflow-y-auto bg-[#f5f7fa] px-6 py-5">
            <header className="mb-7 flex items-center justify-between gap-5">
                <div className="relative w-full max-w-[430px]">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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

                    <AccountBadge />
                </div>
            </header>

            <h1 className="mb-3 text-[2rem] font-bold tracking-[-0.04em] text-slate-900">
                Students Page
            </h1>

            <div className="mb-5 flex items-center justify-end gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Users size={17} className="fill-slate-600 text-slate-600" />
                    <span>Total Students: {students.length}</span>
                </div>
            </div>

            {isEditing && (
                <section className="mb-5 rounded-xl border border-slate-200 bg-[#f8f9fb] px-4 py-4">
                    <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                        <Pencil size={15} />
                        Edit Student
                    </h2>

                    <div className="grid grid-cols-5 gap-3">
                        <label>
                            <span className="mb-1 block text-xs font-semibold text-slate-600">Student Name</span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#7772df]"
                            />
                        </label>
                        <label>
                            <span className="mb-1 block text-xs font-semibold text-slate-600">Age</span>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#7772df]"
                            />
                        </label>
                        <label>
                            <span className="mb-1 block text-xs font-semibold text-slate-600">Email</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#7772df]"
                            />
                        </label>
                        <label>
                            <span className="mb-1 block text-xs font-semibold text-slate-600">Course</span>
                            <input
                                type="text"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#7772df]"
                            />
                        </label>
                        <label>
                            <span className="mb-1 block text-xs font-semibold text-slate-600">Marks</span>
                            <input
                                type="number"
                                value={marks}
                                onChange={(e) => setMarks(e.target.value)}
                                className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#7772df]"
                            />
                        </label>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button
                            type="button"
                            onClick={handleUpdateStudent}
                            className="flex h-9 items-center gap-2 rounded-md bg-[#4f46e5] px-3 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
                        >
                            <Save size={15} />
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="flex h-9 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            <X size={15} />
                            Cancel
                        </button>
                    </div>
                </section>
            )}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <table className="w-full table-fixed border-collapse text-left">
                    <thead>
                        <tr className="h-10 border-b border-slate-100 bg-[#f3f5f8] text-xs font-bold text-slate-800">
                            <th className="w-[10%] px-4">Roll Number</th>
                            <th className="w-[20%] px-4">Student Name</th>
                            <th className="w-[12%] px-4">Course</th>
                            <th className="w-[22%] px-4">Email</th>
                            <th className="w-[12%] px-4">Marks</th>
                            <th className="w-[24%] px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student.rollNumber} className="h-12 border-b border-slate-100 text-sm text-slate-700 last:border-b-0">
                                    <td className="px-4">{student.rollNumber}</td>
                                    <td className="px-4">{student.name}</td>
                                    <td className="px-4">{student.course}</td>
                                    <td className="px-4">{student.email}</td>
                                    <td className="px-4">{student.marks}</td>
                                    <td className="px-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteStudents(student.rollNumber)}
                                                className="flex h-8 items-center gap-1.5 rounded-md border border-red-200 bg-white px-2.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                                            >
                                                <Trash2 size={14} />
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleEditStudent(student.rollNumber)}
                                                className="flex h-8 items-center gap-1.5 rounded-md bg-[#4f46e5] px-2.5 text-xs font-semibold text-white transition hover:bg-[#4338ca]"
                                            >
                                                <Pencil size={14} />
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="h-24 text-center text-sm text-slate-500">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Student;