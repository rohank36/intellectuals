'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./resultsStyles.module.css"

export default function EnterResults() {
    const [mini, setMini] = useState('');
    const [connections, setConnections] = useState('');
    const router = useRouter();

    /*
    const submitResults = () => {
        console.log('Scores submitted');
    }
    */

    return (
        //onSubmit={submitResults} --> include this in form tag later
        <form >
            <div className={styles.container}>
                <h1>Enter your results:</h1>
                <div className={styles.mini}>
                    <label>Mini</label>
                    <input 
                        placeholder="Enter mini time"
                        value={mini}
                        onChange={(e) => setMini(e.target.value)}
                    />
                </div>
                <div className={styles.connections}>
                    <label>Connections</label>
                    <input 
                        placeholder="Enter total mistakes made"
                        value={connections}
                        onChange={(e) => setConnections(e.target.value)}
                    />
                </div>
                <button className={styles.submitBtn} type="submit">Submit Scores</button>
            </div>
        </form>
    )
}
/*
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
*/