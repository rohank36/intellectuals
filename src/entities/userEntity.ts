interface User{
    _id?: string; 
    email: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    displayName: string;
    league?: string; 
    accessCode: string;
    hasSubmittedToday: boolean;
    miniTimeToday: number;
    curSeasonPoints: number;
    stats: UserStats;
    createdAt?: Date; 
    updatedAt?: Date;
}

interface UserStats{
    curSeasonMiniTimes: number[];
    avgMiniTime: number;
    totalMiniTime: number;
    totalMinisPlayed: number;
    totalMiniPodiumFinishes: number;
    curSeasonConnectionScores: number[];
    avgConnectionScore: number;
    totalConnectionScore: number;
    totalConnectionsPlayed: number;
    longestPerfectConnectionsStreak: number;
    currentPerfectConnectionsStreak: number;
}

export default User;

