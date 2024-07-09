import iconButtonPlus from "../../assets/icons/icon_button_plus.png";
import styles from "./AddButton.module.scss";
export default function AddButton(props: any) {
  return (
    <div className={styles.addButton_area}>
      <button onClick={props.handlerAdd} className={styles.addButton}>
        <img src={iconButtonPlus} alt="icon button plus" />
        {props.buttonName}
      </button>
    </div>
  );
}
