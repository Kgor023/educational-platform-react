import { useContext } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { ContextStudentsList } from "../../context/StudentsContext";
import styles from "./StudentsCard.module.scss";
import PageArea from "../../components/PageArea/PageArea";
import teacherIconLocation from "../../assets/icons/icon_teacher_location.png";
import teacherIconPhone from "../../assets/icons/icon_teacher_phone.png";
import teacherIconMail from "../../assets/icons/icon_teacher_mail.png";
import teacher_logo from "../../assets/icons/teacher_logo.png";
import { Link, useParams } from "react-router-dom";
import { SHEDULE_FOR_STUDENTS } from "../../constants/const";
export default function StudentsDetails() {
  const params = useParams();
  const contextStudents = useContext(ContextStudentsList);

  const student = contextStudents.studentsList.find(
    (student) => student.students_id.toString() === params.id
  );

  const filteredSchedule = () => {
    return SHEDULE_FOR_STUDENTS.filter((grade) => {
      if (student) {
        return student.grade === grade.grade;
      }
    });
  };
  return (
    <PageArea>
      <PageHeader title="Students Details" />
      {student && (
        <section className={styles.students_card_area}>
          <div className={styles.student_details_area}>
            <div className={styles.student_details_info}>
              <img
                className={styles.student_details__image}
                src={teacher_logo}
                alt="teacher logo"
              />
              <div className={styles.student_details_name}>
                <h2>
                  {student.first_name} {student.last_name}
                </h2>
                <h5>Student of {student.grade} grade </h5>
              </div>
            </div>

            <div className={styles.student_details_contact}>
              <div className={styles.student_details_contact_info}>
                <img src={teacherIconLocation} alt="student icon location" />
                <span>{student.country}</span>
              </div>
              <div className={styles.student_details_contact_info}>
                <img src={teacherIconPhone} alt="student icon phone" />
                <Link to={`tel:${student.phone_number}`}>
                  {student.phone_number}
                </Link>
              </div>
              <div className={styles.student_details_contact_info}>
                <img src={teacherIconMail} alt="student icon mail" />
                <Link to={`mailto:${student.email}`}>{student.email}</Link>
              </div>
            </div>

            <div className={styles.student_details_peronality}>
              <h3>Personality</h3>
              <div className={styles.student_details_peronality_info}>
                <div className={styles.student_details_peronality_info_trait}>
                  <h5>Gender:</h5>
                  <span> {student.gender}</span>
                </div>
                <div className={styles.student_details_peronality_info_trait}>
                  <h5>Age:</h5>
                  <span> {student.age}</span>
                </div>
              </div>
            </div>
            <div className={styles.student_details_about}>
              <h3>About</h3>
              <p>{student.about}</p>
            </div>
            <div className={styles.student_details_education}>
              <h3>Current GPA</h3>
              <p>{student.current_mark}</p>
            </div>
          </div>
          <div className={styles.schedule_area}>
            <h3>Schedule for {student.grade} grade </h3>
            {filteredSchedule().map((day) => {
              return (
                <div className={styles.schedule_days_area}>
                  <div className={styles.schedule_day}>
                    <h4>Monday:</h4>
                    <ul>
                      {day.monday.map((subject) => {
                        return <li>{subject}</li>;
                      })}
                    </ul>
                  </div>
                  <div className={styles.schedule_day}>
                    <h4>Tuesday:</h4>
                    <ul>
                      {day.tuesday.map((subject) => {
                        return <li>{subject}</li>;
                      })}
                    </ul>
                  </div>
                  <div className={styles.schedule_day}>
                    <h4>Wednesday:</h4>
                    <ul>
                      {day.wednesday.map((subject) => {
                        return <li>{subject}</li>;
                      })}
                    </ul>
                  </div>
                  <div className={styles.schedule_day}>
                    <h4>Thursday:</h4>
                    <ul>
                      {day.thursday.map((subject) => {
                        return <li>{subject}</li>;
                      })}
                    </ul>
                  </div>
                  <div className={styles.schedule_day}>
                    <h4>Friday:</h4>
                    <ul>
                      {day.friday.map((subject) => {
                        return <li>{subject}</li>;
                      })}
                    </ul>
                  </div>
                  <div className={styles.schedule_day}>
                    <h4>Saturday:</h4>
                    <ul>
                      {day.saturday.map((subject) => {
                        return <li>{subject}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </PageArea>
  );
}
