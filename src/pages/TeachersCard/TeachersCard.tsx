import { useContext } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import styles from "./TeachersCard.module.scss";
import PageArea from "../../components/PageArea/PageArea";
import backgroundTeacherDetails from "../../assets/backgrounds/background_teacher_details.png";
import teacherIconLocation from "../../assets/icons/icon_teacher_location.png";
import teacherIconPhone from "../../assets/icons/icon_teacher_phone.png";
import teacherIconMail from "../../assets/icons/icon_teacher_mail.png";
import teacher_logo from "../../assets/icons/teacher_logo.png";
import { Link, useParams } from "react-router-dom";
import { SHEDULE_FOR_STUDENTS } from "../../constants/const";
import { ContextTeachersList } from "../../context/TeacherContext";

export default function TeachersDetails() {
  const params = useParams();
  const contextTeachers = useContext(ContextTeachersList);

  const teacher = contextTeachers.teachersList.find(
    (teacher) => teacher.teacher_id.toString() === params.id
  );
  
 
  return (
    <PageArea>
      <PageHeader title="Teacher Details" />
      {teacher && (
 
          <div className={styles.teacher_details_area}>
            <img
              src={backgroundTeacherDetails}
              alt="background teacher details"
            />
         
            <div className={styles.teacher_details_info}>
            <img
              className={styles.teacher_details__image}
              src={teacher_logo}
              alt="teacher logo"
            />
              <div className={styles.teacher_details_name}>
                <h2>
                  {teacher.first_name} {teacher.last_name}
                </h2>
                <h5>{teacher.subject} Teacher</h5>
              </div>
              <div className={styles.teacher_details_contact}>
                <div className={styles.teacher_details_contact_info}>
                  <img src={teacherIconLocation} alt="teacher icon location" />
                  <span>{teacher.country}</span>
                </div>
                <div className={styles.teacher_details_contact_info}>
                  <img src={teacherIconPhone} alt="teacher icon phone" />
                  <Link to={`tel:${teacher.phone_number}`}>{teacher.phone_number}</Link>
                </div>
                <div className={styles.teacher_details_contact_info}>
                  <img src={teacherIconMail} alt="teacher icon mail" />
                  <Link to={`mailto:${teacher.email}`}>{teacher.email}</Link>
                </div>
              </div>

              <div className={styles.teacher_details_peronality}>
                <h3>Personality</h3>
                <div className={styles.teacher_details_peronality_info}>
                  <div className={styles.teacher_details_peronality_info_trait}>
                    <h5>Gender:</h5>
                    <span> {teacher.gender}</span>
                  </div>
                  <div className={styles.teacher_details_peronality_info_trait}>
                    <h5>Age:</h5>
                    <span> {teacher.age}</span>
                  </div>
                </div>
              </div>
              <div className={styles.teacher_details_about}>
                <h3>About</h3>
                <p>{teacher.about}</p>
              </div>
              <div className={styles.teacher_details_education}>
                <h3>Education</h3>
                <p>{teacher.university}</p>
              </div>
            </div>
          </div>
 
      )}
    </PageArea>
  );
}
