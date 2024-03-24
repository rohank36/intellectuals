import { NextResponse, NextRequest } from "next/server";
import LeagueService from "../../services/league";

export async function GET(request: NextRequest){
    const accessCode = request.nextUrl.searchParams.get("accessCode");
    if (!accessCode) {
        return NextResponse.json({ message: "Missing or invalid accessCode parameter" }, { status: 400 });
    }
    try{
        const league = await LeagueService.getLeagueByAccessCode(accessCode);
        return NextResponse.json({ message: "League fetched successfully", league: league }, { status: 200 });
    }catch(err){
        console.error("Failed to get league", err);
        return NextResponse.json({ message: "Failed to get league", error: err}, { status: 500 });
    }
}

//TODO: write endpoints for adding and removing a player from a league 
