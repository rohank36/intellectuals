import React, {useEffect, useState} from 'react';
import LoadingComponent from "@/app/LoadingComponent";
import LeagueInterface from "@/entities/leagueEntity";
import UserInterface from "@/entities/userEntity";

interface BoardEntry {
    players: string[];
    totalPoints: number;
    miniTime?: number;
}
  
interface LeaderboardProps {
    leaderboardType: string;
    board: { [position: string]: BoardEntry };
}

const Leaderboard = ({ leaderboardType, board }: LeaderboardProps) => {
    const [boardType, setBoardType] = useState(() => {
        switch(leaderboardType){
            case "general": return "Season Standings";
            case "topFive": return "Daily Top 5 Minis";
            case "championship": return "Championship Standings";
            default: return ""; 
        }
    });

    const generateTableRows = () => {
        const rows: JSX.Element[] = [];
        Object.entries(board).forEach(([position, entry]) => {
            const { players, totalPoints, miniTime } = entry;
            players.forEach((player: string) => {
                const displayValue = leaderboardType === "topFive" ? miniTime?.toFixed(2): totalPoints.toString();
                rows.push(
                    <tr key={`${position}-${player}`}>
                        <th className="px-2">{position}</th>
                        <td className="px-2 truncate max-w-xs">{player}</td>
                        <td className="px-2">{displayValue}</td>
                    </tr>
                );
            });
        });
        return rows;
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-4">
                <h2 className="text-xl font-bold">{boardType}</h2>
            </div>
            <div className="overflow-x-auto max-w-2xl">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="px-2 w-12">Position</th>
                            <th className="px-2">Player</th>
                            <th className="px-2 w-32">{leaderboardType === "topFive" ? "Mini Time" : "Points"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
