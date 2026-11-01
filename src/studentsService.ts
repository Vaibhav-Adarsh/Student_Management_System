// let studentName : string = "Vaibhav";
// let studentAge: number = 20;
// let studentMarks: number = 85;
// let isEnrolled : boolean = true;

//object

// let student: { name: string; age: number; marks: number; isEnrolled: boolean; } = {
//     name: "Vaibhav",
//     age: 21,
//     marks: 85,
//     isEnrolled: true
    
// };

// console.log(student.name);

// >>ARRAY

// let students: string[] = ["Vaibhav", "Rahul", "Priya"];
 // console.log(students[0]);
// console.log(students.length);

// //>> Object in array

// interface Student{
//     name: string;
//     marks: number;
//     readonly rollNumber: number;
//     email?: string;
// }

// const students: Student[] = [
//     {
//         name: "Rahul",
//         marks: 85,
//         rollNumber: 101,
//         email: "rahul@gmail.com"
//     },

//     {
//         name: "Priya Patel",
//         marks: 92,
//         rollNumber: 102,
//         email: "priya@gmail.com"
//     },
//     {
//         name: "Amit Verma",
//         marks: 78,
//         rollNumber: 103,
//         email: "amit@gmail.com"
//     }
// ];



// console.log(students[0].name);
// console.log(students[1].name);

// function totalMarks(Mathematics: number, Science: number,
//     English: number): number {
//     return Mathematics + Science + English;
// }

// console.log(totalMarks(90, 85, 88));

// function calculateAverage(Mathematics: number, Science: number,
//     English: number): number {
//         let totalsum = Mathematics + Science + English;
//         return totalsum / 3;
//     }
// console.log(calculateAverage(90, 85, 88));

// function welcomeStudent(name: string): void {
//     console.log(`Welcome ${name}`);
// }

//  welcomeStudent("Vaibhav");


// function displayStudent(name: string, age?: number): void {
//     console.log(`Name is ${name}`);
//     if(age != undefined){
//         console.log(`Age is ${age}`);
//     }
// }
// displayStudent("Vaibhav");
// displayStudent("Rahul", 21);


import type { Student } from "./types.js";
import { students } from "./data.js";

// 1. Add student
export function addStudent(newStudent: Student): void {
    const studentExists = students.some(
        (student: Student) => student.rollNumber === newStudent.rollNumber
    );

    if (studentExists) {
        console.log("Student already exists");
    } else {
        students.push(newStudent);
        console.log("Student added successfully");
    }
}

// 2. Find student
export function findStudent(rollNumber: number): Student | undefined {
    return students.find(
        (student) => student.rollNumber === rollNumber
    );
}

// 3. Update student marks
export function updateStudentMarks(
    rollNumber: number,
    newMarks: number
): void {
    const student = findStudent(rollNumber);

    if (student) {
        student.marks = newMarks;
        console.log("Student marks updated successfully");
    } else {
        console.log("Student not found");
    }
}

// 4. Delete student
export function deleteStudent(rollNumber: number): void {
    const index = students.findIndex(
        (student) => student.rollNumber === rollNumber
    );

    if (index === -1) {
        console.log("Student not found");
        return;
    }

    students.splice(index, 1);
    console.log("Student deleted successfully");
}

// 5. Get all students
export function getAllStudents(): Student[] {
    return students;
}