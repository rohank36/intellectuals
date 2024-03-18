import mongoose, { Schema } from "mongoose";

const leagueSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        accessCode: {type: String, unique: true},
        players: {type: [String], default: []}, //use player emails in array
        isInSeason: {type: Boolean, default: false},
        leaderboard: {type: [String], default: []},
        topFive: {type: [String], default: []},
        avgMiniTime: {type: Number, default: 0},
        avgConnectionScore: {type: Number, default: 0},
    }
)

const League = mongoose.models.League || mongoose.model("League", leagueSchema);
export default League;