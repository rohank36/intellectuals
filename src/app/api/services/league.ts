import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import League from "../../../models/league";
import throwError from "./error";
import UserService from "./user";
import { platform } from "os";
import Leaderboard from "@/app/dashboard/Leaderboard";

interface LeaderboardEntry {
    email: string;
    totalPoints: number;
}

interface Leaderboard {
    [position: string]: LeaderboardEntry;
}

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


    static async checkAndUpdateTopFive(email: string, miniTime: number, topFive: any, accessCode: String) {
        let inserted = false;
        let positionToUpdate = -1;
    
        // Check if miniTime should be inserted or if it ties with an existing time
        for (let position = 1; position <= 5; position++) {
            const entry = topFive[position.toString()];
            if (entry) {
                // Check for tie, if the submitting player is not already in the list for this time
                if (entry.miniTime === miniTime && !entry.players.includes(email)) {
                    entry.players.push(email);
                    inserted = true;
                    break;
                } else if (entry.miniTime > miniTime) {
                    // If the time is better and should be inserted higher in the leaderboard
                    positionToUpdate = position;
                    break;
                }
            } else {
                // If we have less than 5 times, we can insert it at this position
                positionToUpdate = position;
                break;
            }
        }
    
        // If we have a new top 5 time but didn't insert it yet
        if (positionToUpdate !== -1 && !inserted) {
            for (let i = 5; i > positionToUpdate; i--) {
                if (topFive[(i - 1).toString()]) {
                    topFive[i.toString()] = { ...topFive[(i - 1).toString()] };
                }
            }
            topFive[positionToUpdate.toString()] = { players: [email], miniTime: miniTime };
            inserted = true;
        }
    
        if (inserted) {
            // Update the database with the new topFive
            await connectMongoDB();
            await League.findOneAndUpdate({ accessCode: accessCode }, { $set: { "topFive": topFive } }, { new: true });
            return `Successfully updated the leaderboard with the time: ${miniTime}`;
        } else {
            // Handle the case where the time doesn't make it to the leaderboard
            // This could be a message to the user or logging
            return `The time ${miniTime} did not make it to the top 5 leaderboard.`;
        }
    }
    


    static async updateLeagueTopFive(email:string, miniTime: number, accessCode: String, hasSubmittedToday: boolean){
        if(hasSubmittedToday){
            throw new Error("User has already submitted today's scores");
        }
        
        try{
            const league = await this.getLeagueByAccessCode(accessCode);
            if(league.topFive){
                //update top 5 leaderboard
                await this.checkAndUpdateTopFive(email, miniTime, league.topFive, accessCode);
                return `Successfully updated ${league.name} top 5`;
            }else{
                //create top 5 and add player at number 1
                league.topFive = {};
                league.topFive["1"] ={
                    players: [email],
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

    static async updateLeagueLeaderboard(email: string, accessCode: String) {
        try {
            let inserted = false;
            let positionToUpdate = -1;
            const user = await UserService.getUser(email);
            const league = await this.getLeagueByAccessCode(accessCode);
            
            for(let position = 1; position <= league.players.length; position++){
                const entry = league.leaderboard[position.toString()];
                if(entry){
                    
                }
            }

        } catch (error) {
            await throwError(error);
        }
    }
    
    
}

export default LeagueService;