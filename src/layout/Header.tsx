import { Outlet } from "react-router-dom";
import icon_logo from "../assets/icons/icon_logo.png";
import icon_dashboard from "../assets/icons/icon_house.png";
import icon_students from "../assets/icons/icon_student.png";
import icon_teachers from "../assets/icons/icon_teacher.png";
import icon_event from "../assets/icons/icon_event.png";
import icon_finance from "../assets/icons/icon_finance.png";
import icon_LastestActivity from "../assets/icons/icon_activity.png";
import styles from "./Header.module.scss";
import Navigation from "../components/Navigation/Navigation";
import EventProvider from "../context/EventContext";
import TeachersProvider from "../context/TeacherContext";
import StudentsProvider from "../context/StudentsContext";
import SearchBarProvider from "../context/SearchBarContext";


export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_logo}>
          <img src={icon_logo} alt="" />
          <span className={styles.header_title}>Academi</span>
        </div>
        <nav>
          <Navigation path="/" title="Dashboard" logo={icon_dashboard} />
          <Navigation path="/students" title="Students" logo={icon_students} />
          <Navigation path="/teachers" title="Teachers" logo={icon_teachers} />
          <Navigation path="/event" title="Event" logo={icon_event} />
          <Navigation path="/rating" title="Rating" logo={icon_finance} />
          <Navigation
            path="/kanban"
            title="Kanban"
            logo={icon_LastestActivity}
          />
        </nav>
      </header>
      <EventProvider>
        <SearchBarProvider>
          <StudentsProvider>
            <TeachersProvider>
              <Outlet />
            </TeachersProvider>
          </StudentsProvider>
        </SearchBarProvider>
      </EventProvider>
    </>
  );
}
