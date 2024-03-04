import styles from "./dashboardStyles.module.css";
import Leaderboard from "./Leaderboard";

export default function Page() {
    return(
      <div>
        <h1>Hello, Leaderboard Page!</h1>
        <Leaderboard title="Season Ranking"/>
        <Leaderboard title="Todays Top 5 Mini Times"/>
        <Leaderboard title="Previous Seasons Top 3"/>
      </div>
    );
  }

  //Season Ranking 
  //Championship rankings 
  //top 5 mini times
  //previous seasons top 3 