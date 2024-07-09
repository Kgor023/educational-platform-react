import { createContext, useEffect, useState } from "react";

interface IContextStudentsList {
  studentsList: StudentsType[];
  setStudentsList: (value: StudentsType[]) => void;
}
type StudentsType = {
  students_id: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone_number: string;
  age: number;
  grade: string;
  country: string;
  about: string;
  current_mark: number;
  oneYearAgo_mark: number;
  twoYearAgo_mark: number;
  threeYearAgo_mark: number;
  fourYearAgo_mark: number;
};

export const ContextStudentsList = createContext<IContextStudentsList>({
    studentsList: [],
    setStudentsList: () => {},
  });
export default function StudentsProvider({ children }) {
    const [studentsList, setStudentsList] = useState<StudentsType[]>([]);

    useEffect(() => {
        async function getStudents() {
          const response = await fetch(
            "https://my.api.mockaroo.com/students.json?key=6d430560"
          );
          const value = await response.json();
          setStudentsList([...value]);
        }
        getStudents();
      }, []);
  return (
    <ContextStudentsList.Provider value={{ studentsList, setStudentsList }}>
      {children}
    </ContextStudentsList.Provider>
  );
}
