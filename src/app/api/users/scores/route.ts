import { NextResponse, NextRequest } from "next/server";
import UserService from "../../services/user";

export async function PUT(request: NextRequest){
    //after user enters their mini and connections results
    // - verify that it is within the time frame of the given day
    // - add totalMiniTime, totalMinisplayed, totalConectionsScore, totalConnectionsPlayed
    // - update leardboard with results if in season 
    const {email: email, miniTime: miniTime, connectionMistakes: connectionMistakes} = await request.json();
    if (!email) {
        return NextResponse.json({ message: "Missing or invalid email parameter" }, { status: 400 });
    }
    try{
        await UserService.updateTotalMini(miniTime, email);
        await UserService.updateTotalConnections(connectionMistakes, email);
        return NextResponse.json({ message: "Scores sent successfully" }, { status: 200 });
    }catch(err){
        console.error("Failed to send scores: ", err);
        return NextResponse.json({ message: "Failed to send scores", error: err}, { status: 500 });
    }
}

