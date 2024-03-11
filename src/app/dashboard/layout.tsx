'use client'
import styles from "./dashboardStyles.module.css";
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const router = useRouter()
    return(
        <div>
            <div className={styles.navbar}>
                <p className={styles.title}>Intellectuals</p>
                <div className={styles.navItems}>
                    <button type="button" onClick={() => router.push('/dashboard/results')}>
                      Log Results
                    </button>
                    <button type="button" onClick={() => router.push('/dashboard/stats')}>
                      Stats
                    </button>
                    <button type="button" onClick={() => router.push('/dashboard')}>
                      Leaderboard
                    </button>
                    <a href="/api/auth/logout">Logout</a>
                </div>
            </div>
            <section className={styles.section}>{children}</section>
        </div>
    )
  }