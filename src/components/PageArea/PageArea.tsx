import styles from "./PageArea.module.scss";

export default function PageArea({children}) {
return(
    <div className={styles.page_area}>
        {children}
    </div>
)
}