import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        _id: String,
        name: String,
        accessCode: String,
        stats:{
            //add to archive before end of season reset. 
            //can only add to these when season is ongoing.
            curSeasonMiniTimes: Array<String>, // minisPlayedThisSeason = miniscores.length;
            avgMiniTime: Number, //avgMiniTime = totalMiniTime/totalMinisPlayed
            totalMiniTime: Number,
            totalMinisPlayed: Number,
            totalMiniPodiumFinishes: Number,

            curSeasonConnectionScores: Array<Number>,//connectionsPlayedThisSeason = curSeasonConnectionScores.length
            avgConnectionScore: Number, //avgConnectionScore = totalConnectionScore/totalConnectionsPlayed
            totalConnectionScore: Number,
            totalConnectionsPlayed: Number,
            longestPerfectConnectionsStreak: Number,
        },
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;