import { createBrowserRouter } from "react-router-dom";
import Header from "../layout/Header";
import Dashboard from "../pages/Dashboard/Dashboard";
import Students from "../pages/Students/Students";
import Teachers from "../pages/Teachers/Teachers";
import Event from "../pages/Calendar/Event";
import Rating from "../pages/Rating/Rating";
import Kanban from "../pages/Kanban/Kanban";
import TeachersCard from "../pages/TeachersCard/TeachersCard";
import StudentsCard from "../pages/StudentsCard/StudentsCard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/Students",
        element: <Students />,
      },
      {
        path: "students/:id",
        element: <StudentsCard />,
      },
      {
        path: "/Teachers",
        element: <Teachers />,
      },
      {
        path: "teachers/:id",
        element: <TeachersCard />,
      },
      {
        path: "/Event",
        element: <Event />,
      },
      {
        path: "/Rating",
        element: <Rating />,
      },
      {
        path: "/Kanban",
        element: <Kanban />,
      },
    ],
  },
]);
