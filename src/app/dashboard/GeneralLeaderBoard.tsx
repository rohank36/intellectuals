import React, {useEffect, useState} from 'react';
import Leaderboard from "./Leaderboard";
import LoadingComponent from "@/app/LoadingComponent";
import LeagueInterface from "@/entities/leagueEntity";
import UserInterface from "@/entities/userEntity";
import LeagueService from '@/frontend_services/league';
import UserService from "@/frontend_services/user";

const GeneraLeaderBoard = (props: {email: string}) =>{
    const [user, setUser] = useState<UserInterface | null>(null);
    const [league, setLeague] = useState<LeagueInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [topFive, setTopFive] = useState({});
    const [standings, setStandings] = useState({});
    const [championship, setChampionship] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const userRes = await UserService.getUser(props.email);
            if (userRes.user) {
                setUser(userRes.user);
                const leagueRes = await LeagueService.getLeague(userRes.user.accessCode);
                if (leagueRes.league) {
                    setLeague(leagueRes.league);
                    if(leagueRes.league.topFive){
                      setTopFive(leagueRes.league.topFive);
                    }
                    if(leagueRes.league.leaderboard){
                      setStandings(leagueRes.league.leaderboard);
                    }
                    if(leagueRes.league.championshipBoard){
                      setChampionship(leagueRes.league.championshipBoard);
                    }
                    setIsLoading(false);
                }
            }

        };
        fetchUser().catch(console.error);
    }, [props.email])
    

   if(isLoading){
    return <LoadingComponent/>;
   }else{
      return(
          <div className="flex flex-col justify-center items-center ml-14 mr-14">
            <h1 className='text-2xl font-bold text-center'>{league?.name} Leaderboards</h1>
            <div className="flex flex-row justify-center space-x-36 mt-12">
              <Leaderboard leaderboardType="topFive" board={topFive}/>
              <Leaderboard leaderboardType="general" board={standings}/>
              <Leaderboard leaderboardType="championship" board={championship}/>
            </div>
          </div>
      );
   }
}

export default GeneraLeaderBoard;