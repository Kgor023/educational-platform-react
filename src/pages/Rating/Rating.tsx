import { useContext } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { ContextStudentsList } from "../../context/StudentsContext";
import styles from "./Rating.module.scss";
import icon_totalStudents from "../../assets/icons/icon_totalStudents.png";
import icon_totalGPA from "../../assets/icons/icon_totalGPA.png";
import PageArea from "../../components/PageArea/PageArea";
import StatisticCard from "../../components/StatisticCard/StatisticCard";
import RatingTable from "../../components/RatingTable/RatingTable";
import { calcAverageMark } from '../../utils/CalcAverageRating';

export default function Rating() {
  const contextStudents = useContext(ContextStudentsList);
  const filteredBestStudents = contextStudents.studentsList.filter(
    (student) => student.current_mark > 90
  );

  const averageMarkAllTime = calcAverageMark(contextStudents.studentsList).averageMarkAllTime;

  return (
    <PageArea>
      <PageHeader title="Rating" >
      <div className={styles.stats_area}>
        <StatisticCard
          image={icon_totalStudents}
          people={"Total Students"}
          peopleStat={contextStudents.studentsList.length}
        />
        <StatisticCard
          image={icon_totalGPA}
          people={"GPA of all time"}
          peopleStat={averageMarkAllTime}
        />
      </div>
      </PageHeader>

      <div className={styles.rating_area}>
        <div className={styles.rating_area__graph}>
          <RatingTable students={contextStudents.studentsList} />
        </div>
        <div className={styles.rating_stats_area_students}>
          <h2>Best GPA</h2>
          <div className={styles.rating_stats_area_students_list}>
            {filteredBestStudents.map((student) => (
              <div
                key={student.students_id}
                className={styles.rating_stats_area_student}
              >
                <div className={styles.rating_stats_area_student__name}>
                  <h3>{student.first_name}</h3>
                  <h4>{student.last_name}</h4>
                </div>
                <span>{student.current_mark}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageArea>
  );
}
