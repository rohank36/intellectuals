import mongoose, { Schema } from "mongoose";

const leagueSchema = new Schema(
    {
        _id: String, 
        name: String,
        accessCode: String,
        players: Array<String>, //use player ids in array
        isInSeason: Boolean,
        leaderboard: Array<String>,
        topFive: Array<String>,
        avgMiniTime: Number,
        avgConnectionScore: Number,
    }
)

const League = mongoose.models.League || mongoose.model("League", leagueSchema);
export default League;