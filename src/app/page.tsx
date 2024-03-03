import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.landing}>
      <h1>Welcome Fellow Intellectual</h1>
      <div>
        <input placeholder="Enter Access Code"></input>
        <button>Login</button>
      </div>
    </div>  
  );
}
