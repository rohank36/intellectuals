import React from 'react';
import styles from './dashboardStyles.module.css';

interface LeaderboardProps{
    title: string;
}

const Leaderboard = ({title}: LeaderboardProps) =>{
    return(
        <div>
            <h1>{title}</h1>
        </div>
    );

}

export default Leaderboard;