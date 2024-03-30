//export const dynamic = 'force-dynamic'; // static by default, unless reading the request
import { NextResponse, NextRequest } from "next/server";
import UserService from "../services/user";
import LeagueService from "../services/league";
import User from "@/models/user";

export async function PUT(request: NextRequest) {
    try{
        const leagues = await LeagueService.getAllActiveLeagues();
        await UserService.resetUserHasSubmittedToday();
        if(leagues){
            for(const league of leagues){
                //calculate mini podium points -> update user points, update user mini podium stats
                if(league.topFive){
                    const topFive = league.topFive; 
                    for(const key of Object.keys(topFive)){
                        let points = UserService.calculateMiniPodiumPoints(key);
                        for(const email of topFive[key].players){
                            await UserService.updateUserPointsAfterMiniPodium(points!, email);
                            await LeagueService.updateLeagueLeaderboard(email, league.accessCode);
                        }
                    }
                }                
                //reset league top Five
                await LeagueService.resetLeagueTopFive(league.accessCode);
            }
        }
        await UserService.resetUserMiniPointsToday();
        return NextResponse.json({ message: "Cron job ran successfully"}, { status: 200 });
    }catch(error){
        console.error("Failed to run cron job: ", error);
        return NextResponse.json({ message: "Failed to run cron job"}, { status: 500 });
    }
}