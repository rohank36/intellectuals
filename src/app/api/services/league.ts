import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import League from "../../../models/user";
import throwError from "./error";

class LeagueService{
    static async getLeagueByAccessCode(leagueCode:String){
        try{
            await connectMongoDB();
            const league = await League.findOne({leagueCode});
            return league;
        }catch(error){
            await throwError(error);
        }
    }

    static async addPlayerToLeague(email:String, leagueCode:String){
        try{
            await connectMongoDB();
            const curLeague = await this.getLeagueByAccessCode(leagueCode);
            if(!curLeague){
                throw new Error('Error finding league');
            }else{
                curLeague.players.push(email);
                await League.findOneAndUpdate({accessCode:leagueCode},{players:curLeague.players});
                return `Successfully added ${email} to ${curLeague.name}`;
            }
        }catch(error){
            await throwError(error);
        }
    }

}

export default LeagueService;