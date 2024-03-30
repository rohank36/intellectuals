//export const dynamic = 'force-dynamic'; // static by default, unless reading the request
import { NextResponse, NextRequest } from "next/server";
import UserService from "../services/user";
import LeagueService from "../services/league";

export async function PUT(request: NextRequest) {
    try{
        //const leagues = await LeagueService.getAllActiveLeagues();
        await UserService.resetUserHasSubmittedToday();
        return NextResponse.json({ message: "Cron job ran successfully"}, { status: 200 });
    }catch(error){
        console.error("Failed to run cron job: ", error);
        return NextResponse.json({ message: "Failed to run cron job"}, { status: 500 });
    }
}