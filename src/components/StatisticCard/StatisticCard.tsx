import styles from "./StatisticCard.module.scss";

export default function StatisticCard(props:any) {
  return (
    <div className={styles.statisticCard_area}>
      <img src={props.image} alt="" />
      <div className={styles.statisticCard_info}>
        <span> {props.people}</span>
        <h4>{props.peopleStat}</h4>
      </div>
    </div>
  );
}
