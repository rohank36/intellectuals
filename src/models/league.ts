import mongoose, { Schema } from "mongoose";

const leagueSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        accessCode: {type: String, required: true, unique: true},
        players: {type: [String], default: []}, //use player emails in array
        isInSeason: {type: Boolean, default: false},
        leaderboard: {type: [String], default: []}, //TODO: think about this datastructure, hashmap better? same for topFive
        championshipBoard:  {type: [String], default: []},
        topFive: {type: {}},
        //topFiveScore: {type: [Number], default: []}, 
        //topFivePlayers: {type: [String], default: []},

        avgMiniTime: {type: Number, default: 0}, 
        totalMiniTime: {type: Number, default: 0},
        totalMinisPlayed: {type: Number, default: 0},

        avgConnectionScore: {type: Number, default: 0},
        totalConnectionScore: {type: Number, default: 0},
        totalConnectionsPlayed: {type: Number, default: 0},
    }
)

const League = mongoose.models.League || mongoose.model("League", leagueSchema);
export default League;