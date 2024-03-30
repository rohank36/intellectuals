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

    static async updateUserAfterScoresSubmitted(miniTime: Number, connectionMistakes: Number, userPoints: Number, email: String){
        //Update: miniTimeToday, hasSubmittedToday, curSeasonMiniTimes, curSeasonConnectionScores, curSeasonPoints
        try{    
            const user = await UserService.getUser(email);
            await connectMongoDB();
            
            const updatedSeasonMiniTimes = [...user.stats.curSeasonMiniTimes, miniTime];
            const updatedSeasonConnectionScores = [...user.stats.curSeasonConnectionScores, connectionMistakes];
            const newCurSeasonPoints = user.curSeasonPoints + userPoints;
            
            //handle user perfect connection streak stats
            if(connectionMistakes == 0){
                const newCurrentStreak = user.stats.currentPerfectConnectionsStreak + 1;
                if(newCurrentStreak > user.stats.longestPerfectConnectionsStreak){
                    await User.findOneAndUpdate({email},{$set:{"stats.longestPerfectConnectionsStreak":newCurrentStreak,"stats.currentPerfectConnectionsStreak":newCurrentStreak,"curSeasonPoints": newCurSeasonPoints,"hasSubmittedToday": true, "miniTimeToday": miniTime,"stats.curSeasonMiniTimes": updatedSeasonMiniTimes, "stats.curSeasonConnectionScores": updatedSeasonConnectionScores}});
                }else{
                    await User.findOneAndUpdate({email},{$set:{"stats.currentPerfectConnectionsStreak":newCurrentStreak,"curSeasonPoints": newCurSeasonPoints,"hasSubmittedToday": true, "miniTimeToday": miniTime,"stats.curSeasonMiniTimes": updatedSeasonMiniTimes, "stats.curSeasonConnectionScores": updatedSeasonConnectionScores}});
                }
            }else{
                if(user.stats.currentPerfectConnectionsStreak > user.stats.longestPerfectConnectionsStreak){
                    await User.findOneAndUpdate({email},{$set:{"stats.longestPerfectConnectionsStreak":user.stats.currentPerfectConnectionsStreak,"stats.currentPerfectConnectionsStreak":0,"curSeasonPoints": newCurSeasonPoints,"hasSubmittedToday": true, "miniTimeToday": miniTime,"stats.curSeasonMiniTimes": updatedSeasonMiniTimes, "stats.curSeasonConnectionScores": updatedSeasonConnectionScores}});
                }
                await User.findOneAndUpdate({email},{$set:{"stats.currentPerfectConnectionsStreak":0,"curSeasonPoints": newCurSeasonPoints,"hasSubmittedToday": true, "miniTimeToday": miniTime,"stats.curSeasonMiniTimes": updatedSeasonMiniTimes, "stats.curSeasonConnectionScores": updatedSeasonConnectionScores}});
                
            }
            
            return `Successfully updated ${email} stats after scores submitted`;
        }catch(error){
            await throwError(error);
        }
    }

    static async calculateBasePoints(connectionMistakes: Number, miniTime: Number, email: String){
        try{
            let connectionPoints = 0;
            let miniPoints = 0;
            if(connectionMistakes !== null){
                
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
            }
            if(miniTime !== null){
                if(miniTime){
                    miniPoints = 3;
                }
            }
            return connectionPoints + miniPoints;
        }catch(error){
            await throwError(error);
        }
    }
    static async updateMiniPodiumStat(email: string){
        try{
            await connectMongoDB();
            const user = await User.findOne({email});
            await User.findOneAndUpdate({email},{$set:{"stats.totalMiniPodiums": user.stats.totalMiniPodiumFinishes + 1}});
            return "Successfully updated User Mini Podiums stat";
        }catch(error){
            await throwError(error);
        }
    }

    static async resetUserHasSubmittedToday(){
        try{
            await connectMongoDB();
            const result = await User.updateMany({}, { $set: { hasSubmittedToday: false } });
            return "Successfully reset Users hasSubmittedToday";
        }catch(error){
            await throwError(error);
        }
    }
   
}

export default UserService;