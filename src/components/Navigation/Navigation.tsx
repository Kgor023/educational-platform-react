import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";

export default function Navigation(props: any) {
  return (
    <div className={styles.navigation_block}>
      <NavLink to={props.path}  className={({ isActive }) => isActive ? styles.active : ''}>
        <img src={props.logo} alt="logo navigation" />
        {props.title}
      </NavLink>
    </div>
  );
}
