import { createContext, useEffect, useState } from "react";

interface IContextTeachersList {
    teachersList: TeachersType[];
    setTeachersList: (value: TeachersType[]) => void;
  }
  type TeachersType = {
    teacher_id: number;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    phone_number: string;
    age: number;
    subject: string;
    university: string;
    country: string;
    about: string;
  };
  export const ContextTeachersList = createContext<IContextTeachersList>({
    teachersList: [],
    setTeachersList: () => {},
  });
  export default function TeachersProvider ({children}){
  const [teachersList, setTeachersList] = useState<TeachersType[]>([]);
  useEffect(() => {
    async function getTeachers() {
      const response = await fetch(
        "https://my.api.mockaroo.com/teachers.json?key=6d430560"
      );
      const value = await response.json();
      setTeachersList([...value]);
    }
    getTeachers();
  }, []);
  return(

        <ContextTeachersList.Provider value={{ teachersList, setTeachersList }}>
          {children}
        </ContextTeachersList.Provider>
      
  )
  }