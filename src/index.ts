
import {
    addStudent,
    findStudent,
    updateStudentMarks,
    deleteStudent,
    getAllStudents,
} from "./studentsService.js";

import {
    getPassedStudents,
    getFailedStudents,
    calculateClassAverage,
    calculateStudentResult,
} from "./resultService.js";

// 1. Add student
console.log("\n--- ADD STUDENT ---");

addStudent({
    name: "Vaibhav",
    age: 21,
    marks: 88,
    rollNumber: 104
});

// 2. Search student
console.log("\n--- SEARCH STUDENT ---");

console.log(findStudent(102));
console.log(findStudent(999));

// 3. Update marks
console.log("\n--- UPDATE MARKS ---");

updateStudentMarks(101, 95);

// 4. Display all students
console.log("\n--- ALL STUDENTS ---");

console.log(getAllStudents());

// 5. Get passed students
console.log("\n--- PASSED STUDENTS ---");

console.log(getPassedStudents());

// 6. Get failed students
console.log("\n--- FAILED STUDENTS ---");

console.log(getFailedStudents());

// 7. Calculate class average
console.log("\n--- CLASS AVERAGE ---");

console.log(calculateClassAverage());

// 8. Calculate individual result
console.log("\n--- STUDENT RESULT ---");

console.log(calculateStudentResult(101));

// 9. Delete student
console.log("\n--- DELETE STUDENT ---");

deleteStudent(102);
console.log(getAllStudents());
