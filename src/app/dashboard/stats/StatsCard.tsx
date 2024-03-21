import React from 'react';

interface StatsCardProps{
    icon: string;
    cardTitle: string;
    data: any;
}

const StatsCard= ({icon,cardTitle, data}: StatsCardProps) =>{
    return(
        <div className="flex flex-col items-center bg-gray-200 border border-gray-300 rounded-lg w-48 h-48 p-4 relative">
            <div className="flex flex-row items-center absolute top-4 left-4">
                <p className="text-lg mr-2">{icon}</p>
                <p>{cardTitle}</p>
            </div>
            <h1 className="text-xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{data}</h1>
        </div>
    );
}

export default StatsCard;