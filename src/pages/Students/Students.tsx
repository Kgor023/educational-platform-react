import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import styles from "./Students.module.scss";
import student_logo from "../../assets/icons/teacher_logo.png";
import PageArea from "../../components/PageArea/PageArea";
import studentCardIconPhone from "../../assets/icons/icon_teacher_card_phone.png";
import studentCardIconMail from "../../assets/icons/icon_teacher_card_mail.png";
import AddButton from "../../components/AddButton/AddButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ContextStudentsList } from "../../context/StudentsContext";
import { ContextSerchBar } from "../../context/SearchBarContext";
import PaginationButton from "../../components/PaginationButton/PaginationButton";

export default function Students() {
  const contextStudents = useContext(ContextStudentsList);
  const contextSerchBar = useContext(ContextSerchBar);
  const [addState, setAddState] = useState(false);
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    age: 0,
    phone_number: "",
    grade: "",
    country: "",
    about: "",
    current_mark: 0,
    oneYearAgo_mark: 0,
    twoYearAgo_mark: 0,
    threeYearAgo_mark: 0,
    fourYearAgo_mark: 0,
  });
  const studentsOnPage = 8;
  const filteredStudents = () => {
    return contextStudents.studentsList.filter((student) =>
      student.first_name
        .toLowerCase()
        .includes(contextSerchBar.search.toLowerCase())
    );
  };

  const paginatedStudents = () => {
    const firstIndex = (currentPage - 1) * studentsOnPage;
    const lastIndex = firstIndex + studentsOnPage;
    return filteredStudents().slice(firstIndex, lastIndex);
  };

  const totalPages = Math.ceil(filteredStudents().length / studentsOnPage);

  const handlerPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlerNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlerAddStudents = () => {
    setAddState(!addState);
  };

  const handlerSaveStudent = (event) => {
    event.preventDefault();
    const updatedStudentsList = [
      {
        ...newStudent,
        students_id: contextStudents.studentsList.length + 1,
        age: Number(newStudent.age),
        current_mark: Number(newStudent.current_mark),
        oneYearAgo_mark: Number(newStudent.oneYearAgo_mark),
        twoYearAgo_mark: Number(newStudent.twoYearAgo_mark),
        threeYearAgo_mark: Number(newStudent.threeYearAgo_mark),
        fourYearAgo_mark: Number(newStudent.fourYearAgo_mark),
      },
      ...contextStudents.studentsList,
    ];
    contextStudents.setStudentsList(updatedStudentsList);
    setAddState(!addState);
  };
  console.log(contextStudents.studentsList);
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handlerDeleteStudent = (event, student_id) => {
    event.stopPropagation();
    const updatedStudentList = contextStudents.studentsList.filter(
      (student) => student.students_id !== student_id
    );
    contextStudents.setStudentsList(updatedStudentList);
  };

  const handlerNavToCard = (student_id) => {
    nav(`/students/${student_id}`);
  };

  return (
    <>
      <div
        className={`${styles.addNewStudent_area} ${
          addState ? styles.show : ""
        }`}
      >
        <div className={styles.addNewStudent_card}>
          <h2>Add New Student</h2>
          <form onSubmit={handlerSaveStudent}>
            <div className={styles.add_form_inputArea}>
            <div className={styles.add_form_input}>
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
            
                onChange={handleInputChange}
                value={newStudent.first_name}
                required
              />
            </div>

            <div className={styles.add_form_input}>
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                onChange={handleInputChange}
                value={newStudent.last_name}
                required
              />
            </div>

            <div className={styles.add_form_input}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
                value={newStudent.email}
                required
              />
            </div>

            <div className={styles.add_form_input}>
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                id="gender"
                name="gender"
                onChange={handleInputChange}
                value={newStudent.gender}
                required
              />
            </div>

            <div className={styles.add_form_input}>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                onChange={handleInputChange}
                value={newStudent.age}
                required
              />
            </div>

            <div className={styles.add_form_input}>
              <label htmlFor="phone_number">Phone</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                onChange={handleInputChange}
                value={newStudent.phone_number}
                required
              />
            </div>
            <div className={styles.add_form_input}>
              <label htmlFor="grade">Grade</label>
              <input
                type="text"
                id="grade"
                name="grade"
                onChange={handleInputChange}
                value={newStudent.grade}
                required
              />
            </div>
            <div className={styles.add_form_input}>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                onChange={handleInputChange}
                value={newStudent.country}
                required
              />
            </div>
            <div className={styles.add_form_input}>
              <label htmlFor="about">About</label>
              <input
                type="text"
                id="about"
                name="about"
                onChange={handleInputChange}
                value={newStudent.about}
                required
              />
            </div>
            <div className={styles.add_form_input}>
              <label htmlFor="current_mark">Current GPA</label>
              <input
                type="text"
                id="current_mark"
                name="current_mark"
                onChange={handleInputChange}
                value={newStudent.current_mark}
                required
              />
            </div>

            <div className={styles.add_form_input}>
              <label htmlFor="oneYearAgo_mark">One Year Ago GPA</label>
              <input
                type="text"
                id="oneYearAgo_mark"
                name="oneYearAgo_mark"
                onChange={handleInputChange}
                value={newStudent.oneYearAgo_mark}
                required
              />
            </div>

            <div className={styles.add_form_input}>
              <label htmlFor="twoYearAgo_mark">Two Years Ago GPA</label>
              <input
                type="text"
                id="twoYearAgo_mark"
                name="twoYearAgo_mark"
                onChange={handleInputChange}
                value={newStudent.twoYearAgo_mark}
                required
              />
            </div>

            <div className={styles.add_form_input}>
              <label htmlFor="threeYearAgo_mark">Three Years Ago GPA</label>
              <input
                type="text"
                id="threeYearAgo_mark"
                name="threeYearAgo_mark"
                onChange={handleInputChange}
                value={newStudent.threeYearAgo_mark}
                required
              />
            </div>

            <div className={styles.add_form_input}>
              <label htmlFor="fourYearAgo_mark">Four Years Ago GPA</label>
              <input
                type="text"
                id="fourYearAgo_mark"
                name="fourYearAgo_mark"
                onChange={handleInputChange}
                value={newStudent.fourYearAgo_mark}
                required
              />
            </div>
          
         

            
            </div>
            <div className={styles.add_form_buttonArea}>
              <button type="submit">Save</button>
              <button type="button" onClick={handlerAddStudents}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      <PageArea>
        <PageHeader title="Students">
          <SearchBar />
          <AddButton handlerAdd={handlerAddStudents} buttonName="New Student" />
        </PageHeader>
        <div className={styles.students_area}>
          {!contextStudents.studentsList.length && <h1>Loading...</h1>}
          {!!contextStudents.studentsList.length &&
            paginatedStudents().map((student) => {
              return (
                <div
                  className={styles.student_card}
                  key={student.students_id}
                  onClick={() => handlerNavToCard(student.students_id)}
                >
                  <img src={student_logo} alt="student logo" />
                  <div className={styles.student_name}>
                    <h3> {student.first_name}</h3>
                    <h3> {student.last_name}</h3>
                  </div>

                  <h4>{student.grade}</h4>
                  <div className={styles.student_card_info}>
                    <div className={styles.student_card_info_details}>
                      <Link
                        to={`tel:${student.phone_number}`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <img
                          src={studentCardIconPhone}
                          alt="student icon phone"
                        />
                      </Link>
                    </div>
                    <div className={styles.student_card_info_details}>
                      <Link
                        to={`mailto:${student.email}`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <img
                          src={studentCardIconMail}
                          alt="student icon mail"
                        />
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={(event) =>
                      handlerDeleteStudent(event, student.students_id)
                    }
                    className={styles.student_card_deleteButton}
                  >
                    X
                  </button>
                </div>
              );
            })}
        </div>
        <div className={styles.paginationControls}>
          <PaginationButton
            buttonName="Previous"
            paginationControl={handlerPreviousPage}
            disabled={currentPage === 1}
          />
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <PaginationButton
            buttonName="Next"
            paginationControl={handlerNextPage}
            disabled={currentPage === totalPages}
          />
        </div>
      </PageArea>
    </>
  );
}
