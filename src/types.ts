
export type Student = {
    name: string;
    age: number;
    marks: number;
    readonly rollNumber: number;
    email?: string;
};

export type StudentResult = {
    name: string;
    total: number;
    average: number;
    isPassed: boolean;
};