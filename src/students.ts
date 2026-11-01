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
type Student = {
    name: string;
    age: number;
    marks: number;
    readonly rollNumber: number
    email?: string;
};

type StudentResult = {
    name: string;
    total: number;
    average: number;
    isPassed: boolean;
};

const students: Student[] = [
    {
        name: 'Rahul',
        age: 20,
        marks: 85,
        rollNumber: 101,
    },
    {
        name: "priya ",
        age: 21,
        marks: 92,
        rollNumber: 102,
        email : "priya@gmail.com"
    }
];
function addStudent(newStudent: Student): void {
    const studentExists = students.some(
        (student) => student.rollNumber === newStudent.rollNumber
    );
    if (studentExists){
        console.log("student already exists");
    }else {
        students.push(newStudent);
        console.log("Student added successfully");
    }

}

const newStudent: Student = {
    name: "Amit Verma",
    age: 22,
    marks: 78,
    rollNumber: 105
};

addStudent(newStudent);
console.log(students);


function findStudent(rollNumber: number): Student | undefined {
    const result = students.find(
        (student) => student.rollNumber === rollNumber
    );
    return result;
}

console.log(findStudent(102));
console.log(findStudent(999));

function updateStudentMarks(rollNumber: number, newMarks: number): void {
    const student = findStudent(rollNumber);
    if(student){
        student.marks = newMarks;
        console.log("Student marks updated successfully");
    }
    else{
        console.log("Student not found");
    }
}

updateStudentMarks(101,90);
console.log(findStudent(101));

function deleteStudent(rollNumber: number): void {
    const index = students.findIndex(student => student.rollNumber === rollNumber);
    
    if(index == -1){
        console.log("Student not found");
        return;
    }

    students.splice(index, 1);
    console.log("student deleted successfully");
}

function getAllStudents(): Student[]{
    return students;
}

function getPassedStudents(): Student[]{
    return students.filter(
        (student) => student.marks >= 40
    );
}

console.log(getPassedStudents());

function getFailedStudents(): Student[]{
    return students.filter(
        (student) => student.marks < 40
    );
}

console.log(getFailedStudents());

function calculateClassAverage():number {
    if(students.length === 0) return 0;

    const total = students.reduce(
        (sum, student) => sum + student.marks, 0
    );

    const Average = total / students.length;
    return Average;
}

function calculateStudentResult(
    rollNumber: number
): StudentResult | undefined{

    const student = findStudent(rollNumber);

    if(!student){
        console.log("Student not found");
        return undefined;
    }

    const total = student.marks;
    const average = student.marks;
    const isPassed = average >= 40;

    return {
        name: student.name,
        total: total,
        average: average,
        isPassed: isPassed
    };
}

console.log(calculateClassAverage());