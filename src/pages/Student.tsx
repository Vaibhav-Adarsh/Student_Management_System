import { useState } from "react";
import { useStudents } from "../context/StudentContext";

function  Student(){
    const { students, setStudents } = useStudents();
    const [search, setSearch] = useState("");

    const filteredStudents = students.filter((student) => {
        return(
            student.name.toLowerCase().includes(search.toLowerCase()) ||
            student.email.toLowerCase().includes(search.toLowerCase()) ||
            student.course.toLowerCase().includes(search.toLowerCase())
        );
    });

    function 


    return(
        <div>
            <h1>Students Page</h1>
            <input type="text"
            placeholder="Search Students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => setSearch("")}>Clear</button>
            <p>Total Students: {students.length}</p>

        <table>
            <thead>
                    <tr>
                        <th>Roll Number</th>
                        <th>Student Name</th>
                        <th>Course</th>
                        <th>Email</th>
                        <th>Marks</th>
                    </tr>
            </thead>

            <tbody>
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                    <tr key={student.rollNumber}>
                        <td>{student.rollNumber}</td>
                        <td>{student.name}</td>
                        <td>{student.course}</td>
                        <td>{student.email}</td>
                        <td>{student.marks}</td>
                    </tr>
                ))): 
                (
                    <tr>
                        <td colSpan={5}> No students found.</td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>


    )
}

export default Student;