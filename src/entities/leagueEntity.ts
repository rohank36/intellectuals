interface League{
    name: string;
    accessCode: string;
    players: string[];
    isInSeason: boolean;
    leaderboard: any; 
    championshipBoard: string[];
    topFive: any; 

    avgMiniTime: number;
    totalMiniTime: number;
    totalMinisPlayed: number;

    avgConnectionScore: number;
    totalConnectionScore: number;
    totalConnectionsPlayed: number;

    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default League;