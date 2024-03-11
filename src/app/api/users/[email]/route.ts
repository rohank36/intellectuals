import { NextResponse, NextRequest } from "next/server";
import UserService from "../../services/user";

// create new user in db
export async function POST(request: NextRequest, {params}: {params: {email: string}}) {
    const { email } = params;
    if (!email) {
        return NextResponse.json({ message: "Missing or invalid email parameter" }, { status: 400 });
    }
    try{
        const user = await UserService.getUser(email);
        if(user){
            return NextResponse.json({ message: "User already exists", user: user }, { status: 409 });
        }
        const newUser = await UserService.createNewUser(email);
        return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
    }catch(err){
        console.error("Failed to create user: ", err);
        return NextResponse.json({ message: "Failed to create user", error: err}, { status: 500 });
    }
}

//get user from db
export async function GET(request: NextRequest, {params}: {params: {email: string}}) {
    const { email } = params;
    if (!email) {
        return NextResponse.json({ message: "Missing or invalid email parameter" }, { status: 400 });
    }
    try{
        const user = await UserService.getUser(email);
        if(!user){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User fetched successfully", user: user }, { status: 200 });
    }catch(err){
        console.error("Failed to get user: ", err);
        return NextResponse.json({ message: "Failed to get user", error: err}, { status: 500 });
    }
}

/*
//update user in db
export async function PUT(request: NextRequest, {params}: {params: {email: string}}){
    const { email } = params;
    if(!email){
        return NextResponse.json({ message: "Missing or invalid email parameter" }, { status: 400 });
    }
    try{
        
    }catch(err){
        console.error("Failed to update user: ", err);
        return NextResponse.json({ message: "Failed to update user", error: err}, { status: 500 });
    }
}
*/
