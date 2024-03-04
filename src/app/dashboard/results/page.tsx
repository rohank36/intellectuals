import styles from "./resultsStyles.module.css";
export default function Page() {
    return(
      <div className={styles.container}>
        <h1>Enter your results:</h1>
        <div className={styles.mini}>
          <label>Mini</label>
          <input placeholder="Enter mini time"></input>
        </div>
        <div className={styles.connections}>
          <label>Connections</label>
          <input placeholder="Enter total mitsakes made"></input>
        </div>
        <button className={styles.submitBtn}>Submit Scores</button>
      </div>
    );
  }