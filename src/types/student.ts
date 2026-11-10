export type Student = {
    rollNumber: number;
    name: string;
    age: number;
    email: string;
    course: string;
    marks: number;
};

export type StudentResult = {
    total: number;
    average: number;
    isPassed: boolean;
};