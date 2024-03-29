import { NextResponse, NextRequest } from "next/server";
import UserService from "../../services/user";
import LeagueService from "../../services/league";

export async function PUT(request: NextRequest){
    const {email: email, miniTime: miniTime, connectionMistakes: connectionMistakes, accessCode: accessCode} = await request.json();
    if (!email) {
        return NextResponse.json({ message: "Missing or invalid email parameter" }, { status: 400 });
    }
    try{
        let hasSubmittedToday = false;
        //Update user and league stats:
        await UserService.updateTotalMini(miniTime, email);
        await LeagueService.updateTotalLeagueMini(miniTime, accessCode);
        await UserService.updateTotalConnections(connectionMistakes, email);
        await LeagueService.updateTotalLeagueConnections(connectionMistakes, accessCode);

        //Update User 
        const points: number | undefined = await UserService.calculateBasePoints(connectionMistakes, miniTime, email);
        if (points !== undefined) {
            await UserService.updateUserAfterScoresSubmitted(miniTime, connectionMistakes, points, email);
            hasSubmittedToday = true;
        }
    
        //Update league leaderboards
        await LeagueService.updateLeagueTopFive(email, miniTime, accessCode, hasSubmittedToday);

        return NextResponse.json({ message: "Scores sent successfully" }, { status: 200 });
    }catch(err){
        console.error("Failed to send scores: ", err);
        return NextResponse.json({ message: "Failed to send scores", error: err}, { status: 500 });
    }
}

