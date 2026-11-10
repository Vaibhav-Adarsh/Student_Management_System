
import { useState, useEffect } from "react";
import type { Student } from "../types/student";

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

  // Load students from LocalStorage
  const [students, setStudents] = useState<Student[]>(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  // Save students whenever the array changes
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Search students
  const filteredStudents = students.filter((student) => {
    return student.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());
  });

  // Reset form
  function resetForm() {
    setName("");
    setAge(0);
    setEmail("");
    setCourse("");
    setMarks(0);
    setError("");
    setEditingId(null);
  }

  // Add or Update Student
  function handleAddStudent() {
    // Validate name and email
    if (name.trim() === "" || email.trim() === "") {
      setError("Name and Email are Required");
      return;
    }

    // Validate marks
    if (marks < 0 || marks > 100) {
      setError("Marks must be between 0 and 100");
      return;
    }

    // Validate age
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

    // Update existing student
    if (editingId !== null) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.rollNumber === editingId ? newStudent : student
        )
      );
    } else {
      // Add new student
      setStudents((prevStudents) => [...prevStudents, newStudent]);
    }

    resetForm();
    setIsOpen(false);
  }

  // Delete Student
  function handleDeleteStudent(id: number) {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.rollNumber !== id)
    );
  }

  // Edit Student
  function handleEditStudent(id: number) {
    const student = students.find((s) => s.rollNumber === id);

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

  // Dashboard Statistics
  const passedStudents = students.filter(
    (student) => student.marks >= 40
  );

  const failedStudents = students.filter(
    (student) => student.marks < 40
  );

  const totalMarks = students.reduce((total, student) => {
    return total + student.marks;
  }, 0);

  const classAverage =
    students.length > 0 ? totalMarks / students.length : 0;

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Dashboard Statistics */}
      <div>
        <div>
          <p>Total Students</p>
          <h2>{students.length}</h2>
        </div>

        <div>
          <p>Passed Students</p>
          <h2>{passedStudents.length}</h2>
        </div>

        <div>
          <p>Failed Students</p>
          <h2>{failedStudents.length}</h2>
        </div>

        <div>
          <p>Class Average</p>
          <h2>{classAverage.toFixed(2)}%</h2>
        </div>
      </div>

      {/* Student List */}
      <div>
        <h2>Students List</h2>

        {filteredStudents.length === 0 ? (
          <p>No students found.</p>
        ) : (
          filteredStudents.map((student) => (
            <div key={student.rollNumber}>
              <h3>{student.name}</h3>

              <p>Roll Number: {student.rollNumber}</p>
              <p>Age: {student.age}</p>
              <p>Email: {student.email}</p>
              <p>Course: {student.course}</p>
              <p>Marks: {student.marks}</p>

              <button
                onClick={() =>
                  handleEditStudent(student.rollNumber)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDeleteStudent(student.rollNumber)
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Student Button */}
      <button
        onClick={() => {
          resetForm();
          setIsOpen(true);
        }}
      >
        Add a Student
      </button>

      {/* Student Form */}
      {isOpen && (
        <div>
          <h2>
            {editingId !== null
              ? "Edit Student"
              : "Add a New Student"}
          </h2>

          {/* Name */}
          <p>Student Name</p>
          <input
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Age */}
          <p>Student Age</p>
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />

          {/* Course */}
          <p>Student Course</p>
          <input
            type="text"
            placeholder="Enter Student Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          {/* Email */}
          <p>Student Email</p>
          <input
            type="email"
            placeholder="Enter Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Marks */}
          <p>Student Marks</p>
          <input
            type="number"
            placeholder="Enter Student Marks"
            value={marks}
            onChange={(e) => setMarks(Number(e.target.value))}
          />

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Form Buttons */}
          <button
            onClick={() => {
              resetForm();
              setIsOpen(false);
            }}
          >
            Close Form
          </button>

          <button onClick={handleAddStudent}>
            {editingId !== null
              ? "Update Student"
              : "Save Student"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
