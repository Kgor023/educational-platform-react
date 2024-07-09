import PageArea from "../../components/PageArea/PageArea";
import PageHeader from "../../components/PageHeader/PageHeader";
import StatisticCard from "../../components/StatisticCard/StatisticCard";
import styles from "./Dashboard.module.scss";
import icon_totalStudents from "../../assets/icons/icon_totalStudents.png";
import icon_totalTeachers from "../../assets/icons/icon_totalTeachers.png";
import icon_totalEvents from "../../assets/icons/icon_totalEvents.png";
import icon_totalGPA from "../../assets/icons/icon_totalGPA.png";
import { useContext } from "react";
import { ContextStudentsList } from "../../context/StudentsContext";
import { ContextEvent } from "../../context/EventContext";
import { ContextTeachersList } from "../../context/TeacherContext";
import RatingTable from "../../components/RatingTable/RatingTable";
import { calcAverageMark } from "../../utils/CalcAverageRating";
import iconWecomePoint from "../../assets/icons/icon_welcome_point.png";

export default function Dashboard() {
  const contextStudents = useContext(ContextStudentsList);
  const contextTeachers = useContext(ContextTeachersList);
  const contextEvents = useContext(ContextEvent);
  const averageMarkCurrent = calcAverageMark(
    contextStudents.studentsList
  ).averageMarkCurrent;

  return (
    <PageArea>
      <PageHeader title="Dashboard">
        <div className={styles.dashboard_stats}>
          <StatisticCard
            image={icon_totalStudents}
            people={"Total Students"}
            peopleStat={contextStudents.studentsList.length}
          />
          <StatisticCard
            image={icon_totalTeachers}
            people={"Total Teachers"}
            peopleStat={contextTeachers.teachersList.length}
          />
          <StatisticCard
            image={icon_totalGPA}
            people={"Current GPA"}
            peopleStat={averageMarkCurrent}
          />
          <StatisticCard
            image={icon_totalEvents}
            people={"Total Events"}
            peopleStat={contextEvents.getTotalNotesCount()}
          />
        </div>
      </PageHeader>
      <div className={styles.dashboard_area}>
        <div className={styles.dashboard_area_rating_graph}>
          <RatingTable students={contextStudents.studentsList} />
        </div>
        <div className={styles.dashboard_area_welcome_block}>
          <h3> Educational platform for Students and Teachers</h3>
          <h4>
            <img src={iconWecomePoint} alt="icon wecome point" />
            Check your GPA
          </h4>
          <h4>
            <img src={iconWecomePoint} alt="icon wecome point" />
            Do your homework with a timer
          </h4>
          <h4>
            <img src={iconWecomePoint} alt="icon wecome point" />
            Take notes about events
          </h4>
          <h2>Welcome to Academy</h2>
        </div>
      </div>
    </PageArea>
  );
}
