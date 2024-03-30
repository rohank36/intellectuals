import { NextResponse, NextRequest } from "next/server";
import LeagueService from "@/app/api/services/league";

//clear user season points in and leaderboards in league
export async function PUT(request: NextRequest){
    const {accessCode: accessCode} = await request.json();
    try{
        await LeagueService.resetAllUserSeasonPoints(accessCode);
        await LeagueService.resetLeagueLeaderboard(accessCode);
        await LeagueService.resetLeagueTopFive(accessCode);
        return NextResponse.json({ message: "League Reset"}, { status: 200 });
    }catch(error){
        console.log('ERROR: ',error);
        return NextResponse.json({ message: "Failed to reset league" }, { status: 500 });
    }
}
