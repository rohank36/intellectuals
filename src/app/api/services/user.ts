import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "../../../models/user";
import throwError from "./error";
import LeagueService from "./league";

class UserService{
    
    /*
    static async throwError(err: any){
        if (err instanceof Error) {
            throw new Error(err.message); 
        } else {
            throw new Error('An unknown error occurred');
        }
    }
    */

    /*
    static async updateUser(email: String, updateDetails: any){
        try{
            
        }catch(error){
            if (error instanceof Error) {
                throw new Error(error.message); 
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    */
    
    static async createNewUser(email:String, firstName:String, lastName:String, displayName:String, accessCode:String){
        try {
            await connectMongoDB();
            const associatedLeague = await LeagueService.getLeagueByAccessCode(accessCode);
            if(!associatedLeague){
                throw new Error("League not found");
            }else{
                let fullName = firstName + " " + lastName;
                const newUser = await User.create({email, firstName, lastName, fullName, displayName, league: associatedLeague._id});
                await LeagueService.addPlayerToLeague(email, accessCode);
                return newUser;
            }
          } catch (error) {
            await throwError(error);
        }
    }

    static async getUser(email: String){
        try{
            await connectMongoDB();
            const user = await User.findOne({email});
            return user;
        }catch(error){
            await throwError(error);
        }
    }

    static async updateTotalMini(miniTime: Number, email: String){
        try{    
            const user = await UserService.getUser(email);
            const newTotalMiniTime = user.stats.totalMiniTime + miniTime;
            const newTotalMinisPlayed = user.stats.totalMinisPlayed + 1;
            const newAvgMiniTime = newTotalMiniTime / newTotalMinisPlayed; 
            await connectMongoDB();
            await User.findOneAndUpdate({email},{$set:{"stats.totalMiniTime": newTotalMiniTime, "stats.totalMinisPlayed": newTotalMinisPlayed, "stats.avgMiniTime": newAvgMiniTime}});
            return "Successfully updated Mini stats";
        }catch(error){
            await throwError(error);
        }
    }

    static async updateTotalConnections(connectionMistakes: Number, email: String){
        try{    
            const user = await UserService.getUser(email);
            const newTotalConnectionScore = user.stats.totalConnectionScore + connectionMistakes;
            const newTotalConnectionsPlayed = user.stats.totalConnectionsPlayed + 1;
            const newAvgConnectionScore = newTotalConnectionScore / newTotalConnectionsPlayed; 
            await connectMongoDB();
            await User.findOneAndUpdate({email},{$set:{"stats.totalConnectionScore": newTotalConnectionScore, "stats.totalConnectionsPlayed": newTotalConnectionsPlayed, "stats.avgConnectionScore": newAvgConnectionScore}});
            return "Successfully updated Connection stats";
        }catch(error){
            await throwError(error);
        }
    }

    static async calculatePoints(connectionMistakes: Number, miniTime: Number, email: String){
        try{
            let connectionPoints = 0;
            switch (connectionMistakes) {
                case 0:
                    connectionPoints = 10;
                    break;
                case 4:
                    connectionPoints = 0;
                    break;
                default:
                    connectionPoints = 5;
                    break;
            }
            let miniPoints = 0;
            if(miniTime){
                miniPoints = 3;
            }
        }catch(error){
            await throwError(error);
        }
    }
   
}

export default UserService;