import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "../../../models/user";

class UserService{
    static async createNewUser(email:String){
        try {
            await connectMongoDB();
            const newUser = await User.create({email});
            return newUser;
          } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message); 
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

    static async getUser(email: String){
        try{
            await connectMongoDB();
            const user = await User.findOne({email});
            return user;
        }catch(error){
            if (error instanceof Error) {
                throw new Error(error.message); 
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

    static async updateTotalMini(miniTime: Number, email: String){
        try{    
            const user = await UserService.getUser(email);
            const newTotalMiniTime = user.stats.totalMiniTime + miniTime;
            const newTotalMinisPlayed = user.stats.totalMinisPlayed + 1;
            const newAvgMiniTime = newTotalMiniTime / newTotalMinisPlayed; //TODO: might have to round for nice number 
            await connectMongoDB();
            await User.findOneAndUpdate({email},{$set:{"stats.totalMiniTime": newTotalMiniTime, "stats.totalMinisPlayed": newTotalMinisPlayed, "stats.avgMiniTime": newAvgMiniTime}});
            return "Successfully updated Mini stats";
        }catch(error){
            if (error instanceof Error) {
                throw new Error(error.message); 
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

    static async updateTotalConnections(connectionMistakes: Number, email: String){
        try{    
            const user = await UserService.getUser(email);
            const newTotalConnectionScore = user.stats.totalConnectionScore + connectionMistakes;
            const newTotalConnectionsPlayed = user.stats.totalConnectionsPlayed + 1;
            const newAvgConnectionScore = newTotalConnectionScore / newTotalConnectionsPlayed; //TODO: might have to round for nice number 
            await connectMongoDB();
            await User.findOneAndUpdate({email},{$set:{"stats.totalConnectionScore": newTotalConnectionScore, "stats.totalConnectionsPlayed": newTotalConnectionsPlayed, "stats.avgConnectionScore": newAvgConnectionScore}});
            return "Successfully updated Connection stats";
        }catch(error){
            if (error instanceof Error) {
                throw new Error(error.message); 
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

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
   
}

export default UserService;