'use client';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function HomePage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>{error.message}</div>;
  else if(user){
    //TODO if user is logged in but does not have a displayName or league, prompt them to enter name and league access code
    return (
      <div className={styles.landing}>
        <h1>Welcome {user.name}</h1>
        <div>
          <button type="button" onClick={() => router.push('/dashboard')}>
            Enter
          </button>
        </div>
      </div>  
    )
  }else{
    return (
      <div className={styles.landing}>
        <h1>Welcome Fellow Intellectual</h1>
        <div>
          <a href="/api/auth/login">Login</a>
        </div>
      </div>  
    );
  }
  
}
