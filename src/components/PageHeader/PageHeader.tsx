import styles from "./PageHeader.module.scss";




export default function PageHeader(props: any) {
  return (
    <div className={styles.pageHeader}>
      <h1>{props.title}</h1>
   
      <div className={styles.pageHeader_toolBar}>
      {props.children}

      </div>
    </div>
  );
}
