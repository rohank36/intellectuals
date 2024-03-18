import React from 'react';
import styles from './dashboardStyles.module.css';

interface LeaderboardProps{
    title: string;
}

//TODO: Consider going a global leaderboard for everyone that uses the site regardless of league (show name, league, points etc)

const Leaderboard = ({title}: LeaderboardProps) =>{
    return(
        <div>
            <h1>{title}</h1>
        </div>
    );

}

export default Leaderboard;