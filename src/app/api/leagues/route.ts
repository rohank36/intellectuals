import { NextResponse, NextRequest } from "next/server";
import LeagueService from "../services/league";

//create new league
export async function POST(request: NextRequest) {
    const {name: name, accessCode: accessCode} = await request.json();
    try{
        const league = await LeagueService.createLeague(name, accessCode);
        return NextResponse.json({ message: "League created successfully", league: league }, { status: 201 });
    }catch(err){
        console.error("Failed to create league", err);
        return NextResponse.json({ message: "Failed to create league", error: err}, { status: 500 });
    }
}

