import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import League from "../../../models/league";
import User from "../../../models/user";
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

    static async getAllLeagues(){
        try{
            await connectMongoDB();
            const leagues = await League.find();
            return leagues;
        }catch(error){
            await throwError(error);
        }
    }

    static async getAllActiveLeagues(){
        try{
            await connectMongoDB();
            const leagues = await League.find({isInSeason: true});
            return leagues;
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
                if (!entry.players) {
                    entry.players = []; // Initialize players as an empty array if undefined
                }
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
    


    static async updateLeagueTopFive(email:string, miniTime: number, accessCode: String){

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
            const user = await UserService.getUser(email);
            const league = await this.getLeagueByAccessCode(accessCode);
            if(league.leaderboard){
                //update top 5 leaderboard
                await this.checkAndUpdateLeagueLeaderboard(email, user.curSeasonPoints, league.leaderboard, accessCode, league.players.length);
                return `Successfully updated ${league.name} leaderboard`;
            }else{
                league.leaderboard = {};
                league.leaderboard["1"] = {
                    players: [email],
                    totalPoints: user.curSeasonPoints
                }
                await connectMongoDB();
                await League.findOneAndUpdate({ accessCode: accessCode }, { $set: { "leaderboard": league.leaderboard } }, { new: true });
                return `Successfully updated ${league.name} leaderboard`;
            }
        } catch (error) {
            await throwError(error);
        }
    }

    static async checkAndUpdateLeagueLeaderboard(email: string, totalPoints: number, leaderboard: any, accessCode: String, totalLeaguePlayers: number) {
        let inserted = false;
    
        // Step 1: Remove the existing player entry if present.
        for (const position in leaderboard) {
            const entry = leaderboard[position];
            if (entry.players.includes(email)) {
                // If the player exists in this position, remove them.
                entry.players = entry.players.filter((playerEmail: string) => playerEmail !== email);
                // If there are no more players left at this position, delete the entry.
                if (entry.players.length === 0) {
                    delete leaderboard[position];
                }
                break; // A player can only exist once in the leaderboard, so we can stop searching.
            }
        }
    
        // Create a new entry for the user.
        const newUserEntry = { players: [email], totalPoints };
    
        // Step 2: Find the appropriate position for the new entry.
        let insertPosition = 1;
        let foundSpot = false;
        for (; insertPosition <= totalLeaguePlayers; insertPosition++) {
            const entry = leaderboard[insertPosition.toString()];
            if (!entry) {
                foundSpot = true; // Found a spot because it's empty.
                break;
            } else if (entry.totalPoints < totalPoints) {
                foundSpot = true; // Found a better spot.
                break;
            } else if (entry.totalPoints === totalPoints) {
                // Keep looking for the next position after the last tie if we're not at the end of the leaderboard.
                if (insertPosition === totalLeaguePlayers) {
                    // If we're at the last position allowed and it's a tie, we insert here and will remove the last one.
                    foundSpot = true;
                    break;
                }
            }
        }
    
        if (foundSpot) {
            // Step 3: Shift entries down if necessary and insert the new entry.
            for (let position = totalLeaguePlayers; position >= insertPosition; position--) {
                if (position === totalLeaguePlayers) {
                    // If the leaderboard is full, we remove the last entry.
                    delete leaderboard[(position + 1).toString()];
                } else {
                    // Shift the entry down.
                    leaderboard[(position + 1).toString()] = { ...leaderboard[position.toString()] };
                }
            }
            leaderboard[insertPosition.toString()] = newUserEntry;
            inserted = true;
        }
    
        if (inserted) {
            // Update the database with the new leaderboard
            await connectMongoDB(); // Make sure this aligns with your actual MongoDB connection logic
            await League.findOneAndUpdate({ accessCode }, { $set: { "leaderboard": leaderboard } }, { new: true });
            return `Successfully updated the leaderboard with ${email}`;
        } 
    }

    static async resetAllUserSeasonPoints(accessCode: string){
        try{
            await connectMongoDB();
            const league = await LeagueService.getLeagueByAccessCode(accessCode);
            for(const email of league.players){
                await User.findOneAndUpdate({email},{$set:{"curSeasonPoints": 0}});
            }
            return "Successfully reset all users points";
        }catch(error){
            await throwError(error);
        }
    }

    static async resetLeagueLeaderboard(accessCode: string){
        try{    
            await connectMongoDB();
            //await League.findOneAndUpdate({accessCode:accessCode},{$set:{"leaderboard": {}}});
            const result = await League.findOneAndUpdate(
                { accessCode: accessCode },
                { $unset: { "leaderboard": "" } }, // Proper use of $unset to remove the field
                { new: true } // Optional: Return the modified document rather than the original
            );
            return "Successfully reset the leaderboard";
        }catch(error){
            await throwError(error);
        }
    }

    static async resetLeagueTopFive(accessCode: string){
        try{    
            await connectMongoDB();
            //await League.findOneAndUpdate({accessCode:accessCode},{$set:{"topFive": {}}});
            const result = await League.findOneAndUpdate(
                { accessCode: accessCode },
                { $unset: { "topFive": "" } }, // Proper use of $unset to remove the field
                { new: true } // Optional: Return the modified document rather than the original
            );
            return "Successfully reset the top 5 leaderboard";
        }catch(error){
            await throwError(error);
        }
    }

    

    static async calculatePodiumPoints(){}
    
    
}

export default LeagueService;