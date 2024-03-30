'use client';
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client';
import UserInformation from './UserInformation';

export default function HomePage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  if (isLoading){
    return(
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }
  else if (error) return <div>{error.message}</div>;
  else if(user && user.name){
    return <UserInformation email={user.name}/>;
  }else{
    return(
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-max">
            <h1 className="text-5xl font-bold py-8">Welcome Fellow Intellectual</h1>
            <button className="btn btn-primary" type="button" onClick={() => router.push('/api/auth/login')}>Login</button>
          </div>
        </div>
      </div>
    );
  }
  
}
