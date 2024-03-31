'use client';
import Stats from "./Stats";
import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingComponent from "@/app/LoadingComponent";

export default function StatsPage() {
  const { user, error, isLoading } = useUser();
  if(isLoading){
    return <LoadingComponent/>;
  }
  if(user && user.name){
    return(
      <div className="mt-36">
        <Stats email={user.name}/>
      </div>
    );
  }
}
