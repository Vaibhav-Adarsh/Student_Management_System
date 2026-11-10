import type { Student, StudentResult } from "./types.js";
import { students } from "./data.js";
import { findStudent } from "./studentsService.js";

// 1. Get passed students
export function getPassedStudents(): Student[] {
    return students.filter(
        (student) => student.marks >= 40
    );
}

// 2. Get failed students
export function getFailedStudents(): Student[] {
    return students.filter(
        (student) => student.marks < 40
    );
}

// 3. Calculate class average
export function calculateClassAverage(): number {
    if (students.length === 0) {
        return 0;
    }

    const total = students.reduce(
        (sum, student) => sum + student.marks,
        0
    );

    return total / students.length;
}

// 4. Calculate individual student result
export function calculateStudentResult(
    rollNumber: number
): StudentResult | undefined {
    const student = findStudent(rollNumber);

    if (!student) {
        console.log("Student not found");
        return undefined;
    }

    const total = student.marks;
    const average = student.marks;
    const isPassed = average >= 40;

    return {
        name: student.name,
        total,
        average,
        isPassed
    };
}