import styles from "./statsStyles.module.css";
import StatsCard from "./StatsCard";
export default function StatsPage() {
  return(
    <div className={styles.stats}>
      <h1 className={styles.statsTitle}>📈 Your Stats!</h1>
      <div className={styles.cardGrid}>
        <StatsCard icon="🕹️" cardTitle="Minis Played" data="25"/>
        <StatsCard icon="⏳" cardTitle="Avg Mini Time" data="25"/>
        <StatsCard icon="⚔️" cardTitle="Avg Mini Time vs League Avg" data="25"/>
        <StatsCard icon="🏆" cardTitle="Total Mini Podium Finishes" data="25"/>
        <StatsCard icon="🕹️" cardTitle="Connections Played" data="25"/>
        <StatsCard icon="🚩" cardTitle="Avg Mistakes Made" data="25"/>
        <StatsCard icon="⚔️" cardTitle="Avg Mistakes Made vs League Avg" data="25"/>
        <StatsCard icon="🚀" cardTitle="Longest Perfect Streak" data="25"/>
      </div>
    </div>
  );
}


//Stats to track
/*
  Mini Games played
  Average Mini Time 
  Average Mini time vs league average 
  Total Mini Podium Finishes 

  Connections Games played
  Average Mistakes made 
  Average Mistakes made vs league average
  Longest Perfect Connections Streak
*/