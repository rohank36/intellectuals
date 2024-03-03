import React from 'react';
import styles from "./statsStyles.module.css";

interface StatsCardProps{
    icon: string;
    cardTitle: string;
    data: any;
}

const StatsCard= ({icon,cardTitle, data}: StatsCardProps) =>{
    return(
        <div className={styles.card}>
            <div className={styles.header}>
                <p className={styles.icon}>{icon}</p>
                <p className={styles.title}>{cardTitle}</p>
            </div>
            <h1 className={styles.data}>{data}</h1>
        </div>
    );
}

export default StatsCard;