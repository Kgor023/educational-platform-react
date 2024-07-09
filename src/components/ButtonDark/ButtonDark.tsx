import styles from './ButtonDark.module.scss'
export default function ButtonDark(props:any){
return(
    <button className={styles.buttonDark} onClick={props.buttonEvent}>
        {props.buttonName}
    </button>
)
}