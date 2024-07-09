import styles from "./PaginationButton.module.scss";
export default function PaginationButton(props: any) {
  return (
    <button
      onClick={props.paginationControl}
      className={styles.paginationButton}
      disabled={props.disabled}
    >
      {props.buttonName}
    </button>
  );
}
