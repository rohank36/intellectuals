import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        fullName: {type: String},
        displayName: { type: String, required: true},
        league: { type: String },
        accessCode: { type: String },
        hasSubmittedToday: {type: Boolean, default: false},
        miniTimeToday: {type: Number, default: 0},
        curSeasonPoints: {type: Number, default: 0},
        stats:{
            curSeasonMiniTimes: { type: [Number], default: [] }, // minisPlayedThisSeason = miniscores.length;
            avgMiniTime: { type: Number, default: 0 }, //avgMiniTime = totalMiniTime/totalMinisPlayed
            totalMiniTime: { type: Number, default: 0 },
            totalMinisPlayed: { type: Number, default: 0 },
            totalMiniPodiumFinishes: { type: Number, default: 0 },

            curSeasonConnectionScores: { type: [Number], default: [] }, //connectionsPlayedThisSeason = curSeasonConnectionScores.length
            avgConnectionScore: { type: Number, default: 0 }, //avgConnectionScore = totalConnectionScore/totalConnectionsPlayed
            totalConnectionScore: { type: Number, default: 0 },
            totalConnectionsPlayed: { type: Number, default: 0 },
            longestPerfectConnectionsStreak: { type: Number, default: 0 },
            currentPerfectConnectionsStreak: { type: Number, default: 0 },
        },
    },  
    {timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;