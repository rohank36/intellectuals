import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        _id: String,
        name: String,
        accessCode: String,
        curStats:{
            //add to archive before end of season reset. 
            //can only add to these when season is ongoing.
            curSeasonMiniTimes: Array<String>, // minisPlayedThisSeason = miniscores.length;
            curSeasonConnectionScores: Array<Number>,//connectionsPlayedThisSeason = curSeasonConnectionScores.length
        },
        archivedStats:{
            avgMiniTime: String,
            totalMinisPlayed: Number,
            totalMiniPodiumFinishes: Number,

            avgConnectionScore: Number,
            totalConnectionsPlayed: Number,
            longestPerfectConnectionsStreak: Number,
        },
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;