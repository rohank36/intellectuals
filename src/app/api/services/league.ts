import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import League from "../../../models/league";
import throwError from "./error";

class LeagueService{
    static async getLeagueByAccessCode(accessCode:String){
        try{
            await connectMongoDB();
            const league = await League.findOne({accessCode: accessCode});
            return league;
        }catch(error){
            await throwError(error);
        }
    }

    static async addPlayerToLeague(email:String, accessCode:String){
        try{
            await connectMongoDB();
            const curLeague = await this.getLeagueByAccessCode(accessCode);
            if(!curLeague){
                throw new Error('Error finding league');
            }else{
                curLeague.players.push(email);
                await League.findOneAndUpdate({accessCode:accessCode},{players:curLeague.players});
                return `Successfully added ${email} to ${curLeague.name}`;
            }
        }catch(error){
            await throwError(error);
        }
    }

    static async createLeague(name:String, accessCode:String){
        try{
            await connectMongoDB();
            const league = await League.create({name, accessCode});
            return league;
        }catch(error){
            await throwError(error);
        }
    }

}

export default LeagueService;