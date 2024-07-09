import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import styles from "./Teachers.module.scss";
import teacher_logo from "../../assets/icons/teacher_logo.png";
import PageArea from "../../components/PageArea/PageArea";
import teacherCardIconPhone from "../../assets/icons/icon_teacher_card_phone.png";
import teacherCardIconMail from "../../assets/icons/icon_teacher_card_mail.png";
import AddButton from "../../components/AddButton/AddButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ContextTeachersList } from "../../context/TeacherContext";
import { ContextSerchBar } from "../../context/SearchBarContext";
import PaginationButton from "../../components/PaginationButton/PaginationButton";

export default function Teachers() {
  const contextTeachers = useContext(ContextTeachersList);
  const contextSerchBar = useContext(ContextSerchBar);
  const [addState, setAddState] = useState(false);
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [newTeacher, setNewTeacher] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    age: 0,
    phone_number: "",
    university: "",
    country: "",
    subject: "",
    about: "",
  });

  const teachersOnPage = 8;
  const filteredTeachers = () => {
    return contextTeachers.teachersList.filter((teacher) =>
      teacher.first_name
        .toLowerCase()
        .includes(contextSerchBar.search.toLowerCase())
    );
  };
  const paginatedTeachers = () => {
    const firstIndex = (currentPage - 1) * teachersOnPage;
    const lastIndex = firstIndex + teachersOnPage;
    return filteredTeachers().slice(firstIndex, lastIndex);
  };

  const totalPages = Math.ceil(filteredTeachers().length / teachersOnPage);

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
  const handlerAddTeacher = () => {
    setAddState(!addState);
  };

  const handlerSaveTeacher = (event: any) => {
    event.preventDefault();
    const updatedTeachersList = [
      { ...newTeacher, teacher_id: contextTeachers.teachersList.length + 1 },
      ...contextTeachers.teachersList,
    ];
    contextTeachers.setTeachersList(updatedTeachersList);
    setAddState(!addState);
  };

  const handleInputChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };
  const handlerDeleteTeacher = (event, teacher_id) => {
    event.stopPropagation();
    const updatedTeachersList = contextTeachers.teachersList.filter(
      (teacher) => teacher.teacher_id !== teacher_id
    );
    contextTeachers.setTeachersList(updatedTeachersList);
  };
  const handlerNavToCard = (teacher_id: any) => {
    nav(`/teachers/${teacher_id}`);
  };

  return (
    <>
      <div
        className={`${styles.addNewTeacher_area} ${
          addState ? styles.show : ""
        }`}
      >
        <div className={styles.addNewTeacher_card}>
          <h2>Add New Teacher</h2>
          <form onSubmit={handlerSaveTeacher}>
            <div className={styles.add_form_inputArea}>
              <div className={styles.add_form_input}>
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  onChange={handleInputChange}
                  value={newTeacher.first_name}
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
                  value={newTeacher.last_name}
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
                  value={newTeacher.email}
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
                  value={newTeacher.gender}
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
                  value={newTeacher.age}
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
                  value={newTeacher.phone_number}
                  required
                />
              </div>
              <div className={styles.add_form_input}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  onChange={handleInputChange}
                  value={newTeacher.subject}
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
                  value={newTeacher.country}
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
                  value={newTeacher.about}
                  required
                />
              </div>
              <div className={styles.add_form_input}>
                <label htmlFor="university">University</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  onChange={handleInputChange}
                  value={newTeacher.university}
                  required
                />
              </div>
            </div>
            <div className={styles.add_form_buttonArea}>
              <button type="submit">Save</button>
              <button type="button" onClick={handlerAddTeacher}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      <PageArea>
        <PageHeader title="Teachers">
          <SearchBar />
          <AddButton handlerAdd={handlerAddTeacher} buttonName="New Teacher" />
        </PageHeader>
        <div className={styles.teachers_area}>
          {!contextTeachers.teachersList.length && <h1>Loading...</h1>}
          {!!contextTeachers.teachersList.length &&
            paginatedTeachers().map((teacher) => {
              return (
                <div
                  className={styles.teacher_card}
                  key={teacher.teacher_id}
                  onClick={() => handlerNavToCard(teacher.teacher_id)}
                >
                  <img src={teacher_logo} alt="teacher logo" />
                  <h3>
                    {teacher.first_name} {teacher.last_name}
                  </h3>

                  <h4>{teacher.subject}</h4>
                  <div className={styles.teacher_card_info}>
                    <div className={styles.teacher_card_info_details}>
                      <Link
                        to={`tel:${teacher.phone_number}`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <img
                          src={teacherCardIconPhone}
                          alt="teacher icon phone"
                        />
                      </Link>
                    </div>
                    <div className={styles.teacher_card_info_details}>
                      <Link
                        to={`mailto:${teacher.email}`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <img
                          src={teacherCardIconMail}
                          alt="teacher icon mail"
                        />
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={(event) =>
                      handlerDeleteTeacher(event, teacher.teacher_id)
                    }
                    className={styles.teacher_card_deleteButton}
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
