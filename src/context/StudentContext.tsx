import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";
import type { Student } from "../types/student";


type StudentContextType = {
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;

};

const StudentContext = createContext<StudentContextType | undefined>(
    undefined
);

type StudentProviderProps = {
    children: ReactNode;
};

const defaultStudents: Student[] = [
    { rollNumber: 101, name: "Rahul Sharma", age: 20, email: "rahul@example.com", course: "BCA", marks: 92 },
    { rollNumber: 102, name: "Priya Verma", age: 21, email: "priya@example.com", course: "BCA", marks: 88 },
    { rollNumber: 103, name: "Aman Singh", age: 22, email: "aman@example.com", course: "B.Sc", marks: 76 },
    { rollNumber: 104, name: "Neha Gupta", age: 23, email: "neha@example.com", course: "BCA", marks: 95 },
    { rollNumber: 105, name: "Rohit Kumar", age: 20, email: "rohit@example.com", course: "B.Sc", marks: 82 },
];

export function StudentProvider({ children }: StudentProviderProps) {
    const [students, setStudents] = useState<Student[]>(() => {
        if (typeof window === "undefined") {
            return defaultStudents;
        }

        const savedStudents = localStorage.getItem("students");

        if (!savedStudents) {
            return defaultStudents;
        }

        try {
            const parsed = JSON.parse(savedStudents) as Student[];
            return parsed.length > 0 ? parsed : defaultStudents;
        } catch {
            return defaultStudents;
        }
    });

    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    return (
        <StudentContext.Provider value={{ students, setStudents }}>
            {children}
        </StudentContext.Provider>
    );
}


export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudents must be used inside StudentProvider");
  }

  return context;
}