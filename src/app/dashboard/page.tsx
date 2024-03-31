'use client'
import Leaderboard from "./Leaderboard";
import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingComponent from "@/app/LoadingComponent";
import GeneraLeaderBoard from "./GeneralLeaderBoard";

export default function DashboardPage() {
  const { user, error, isLoading } = useUser();
  if(isLoading){
    return <LoadingComponent/>;
  }
  if(user && user.name){
    return(
      <GeneraLeaderBoard email={user.name}/>
    );
  }
}
