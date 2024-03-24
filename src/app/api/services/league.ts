import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import League from "../../../models/league";
import throwError from "./error";
import UserService from "./user";
import { platform } from "os";

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

    static async updateTotalLeagueMini(miniTime: Number, accessCode: String){
        try{
            const league = await this.getLeagueByAccessCode(accessCode);
            if(!league){
                throw new Error("Error finding league");
            }else{
                const newTotalMiniTime = league.totalMiniTime + miniTime;
                const newTotalMinisPlayed = league.totalMinisPlayed + 1;
                const newAvgMiniTime = newTotalMiniTime / newTotalMinisPlayed;
                await connectMongoDB();
                await League.findOneAndUpdate({accessCode:accessCode},{$set:{"totalMiniTime": newTotalMiniTime, "totalMinisPlayed": newTotalMinisPlayed, "avgMiniTime": newAvgMiniTime}});
                return `Successfully updated ${league.name} mini stats`;
            }
        }catch(error){  
            await throwError(error);
        }
    }

    static async updateTotalLeagueConnections(connectionMistakes: Number, accessCode: String){
        try{
            const league = await this.getLeagueByAccessCode(accessCode);
            if(!league){
                throw new Error("Error finding league");
            }else{
                const newTotalConnectionScore = league.totalConnectionScore + connectionMistakes;
                const newTotalConnectionsPlayed = league.totalConnectionsPlayed + 1;
                const newAvgConnectionScore = newTotalConnectionScore / newTotalConnectionsPlayed;
                await connectMongoDB();
                await League.findOneAndUpdate({accessCode:accessCode},{$set:{"totalConnectionScore": newTotalConnectionScore, "totalConnectionsPlayed": newTotalConnectionsPlayed, "avgConnectionScore": newAvgConnectionScore}});
                return `Successfully updated ${league.name} connection stats`;
            }
        }catch(error){  
            await throwError(error);
        }
    }


    static async checkTopFive(email:string, miniTime: number, curTopFiveScores: Array<number>, curTopFivePlayers: Array<String>){
        try{
            const maxScore = Math.max(...curTopFiveScores);
            if(miniTime > maxScore){
                //miniTime does not belong in top 5
                return;
            }else if (miniTime == maxScore){
                //miniTime belongs in the top 5

            }
        }catch(error){
            await throwError(error);
        }
    }
    static async updateLeagueTopFive(email:string, miniTime: number, accessCode: String){
        try{
            const league = await this.getLeagueByAccessCode(accessCode);
            if(league.topFive){
                //check if miniTime is in top 5
            }else{
                //create top 5 and add player at number 1
                league.topFive = {};
                league.topFive["1"] ={
                    email: email,
                    miniTime: miniTime
                }; 
                await connectMongoDB();
                await League.findOneAndUpdate({accessCode:accessCode},{$set:{"topFive": league.topFive}},{new: true});
                return `Successfully updated ${league.name} top 5`;
            }
        }catch(error){
            await throwError(error);
        }
    }
    
}

export default LeagueService;