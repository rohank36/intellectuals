import React, { useEffect, useState } from 'react';
import UserService from "@/frontend_services/user";
import LeagueService from "@/frontend_services/league";
import UserInterface from "@/entities/userEntity";
import LeagueInterface from "@/entities/leagueEntity";
import LoadingComponent from "@/app/LoadingComponent";

const Stats = (props: {email:string}) =>{
    //TODO: call get user here from service and use useState to populate the info. easy one.
    const [user, setUser] = useState<UserInterface | null>(null);
    const [league, setLeague] = useState<LeagueInterface | null>(null);
    const [leagueAvgMini, setLeagueAvgMini] = useState(0);
    const [leagueAvgConnection, setLeagueAvgConnection] = useState(0);

    useEffect(() => {
      const fetchUser = async () => {
          const userRes = await UserService.getUser(props.email);
          if(userRes.user){
            setUser(userRes.user);
            const leagueRes = await LeagueService.getLeague(userRes.user.accessCode);
            if(leagueRes.league){
              setLeague(leagueRes.league);
              setLeagueAvgMini(leagueRes.league.avgMiniTime.toFixed(2));
              setLeagueAvgConnection(leagueRes.league.avgConnectionScore.toFixed(2));
            }
          }
      };
      fetchUser().catch(console.error);
    }, [props.email]);

    if(user && league){
      return(
        <div className="ml-14"> 
          <h1 className="text-2xl font-bold mb-6 ml-12">📈 Hey {user.firstName} checkout your stats!</h1>
          <div className="flex flex-wrap justify-center gap-y-8 gap-x-12">
            
            <div className="stats shadow mt-5 ml-14">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <p className="text-3xl">🕹️</p>
                </div>
                <div className="stat-title">Minis Played</div>
                <div className="stat-value text-primary">{user.stats.totalMinisPlayed}</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <p className="text-3xl">⏳</p>
                </div>
                <div className="stat-title">Average Mini Time</div>
                <div className="stat-value text-secondary">{user.stats.avgMiniTime}</div>
                <div className="stat-desc">vs {leagueAvgMini} League Average</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <p className="text-3xl">🏆</p>
                </div>
                <div className="stat-title">Total Mini Podiums</div>
                <div className="stat-value">{user.stats.totalMiniPodiumFinishes}</div>
              </div>
            </div>
    
            <div className="stats shadow mt-5 ml-14">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <p className="text-3xl">🕹️</p>
                </div>
                <div className="stat-title">Connections Played</div>
                <div className="stat-value text-primary">{user.stats.totalConnectionsPlayed}</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <p className="text-3xl">🎯</p>
                </div>
                <div className="stat-title">Average Mistakes Made</div>
                <div className="stat-value text-secondary">{user.stats.avgConnectionScore}</div>
                <div className="stat-desc">vs {leagueAvgConnection} League Average</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <p className="text-3xl">🚀</p>
                </div>
                <div className="stat-title">Longest Perfect Streak</div>
                <div className="stat-value">{user.stats.longestPerfectConnectionsStreak}</div>
              </div>
            </div>
          
          </div>
        </div>
      );
    }else{
      return <LoadingComponent/>;
    }
}

export default Stats;