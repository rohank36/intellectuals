'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EnterResults() {
    const [mini, setMini] = useState('');
    const [connections, setConnections] = useState('');
    const router = useRouter();

    /*
    const submitResults = () => {
        console.log('Scores submitted');
    }
    */
    //TODO: Need to validate here that the formats and range of scores is valid (i.e. connections mistakes can't be <0 || > 4 and mini scores has to follow xx.xx format)
    return (
        //onSubmit={submitResults} --> include this in form tag later
        <form className="flex flex-col items-center justify-center mt-10">
            <div className="text-center">
                <h1 className="text-xl font-semibold mb-4">Enter your results:</h1>
                <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700">Mini</label>
                <input 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter mini time"
                    value={mini}
                    onChange={(e) => setMini(e.target.value)}
                />
                </div>
                <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700">Connections</label>
                <input 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter total mistakes made"
                    value={connections}
                    onChange={(e) => setConnections(e.target.value)}
                />
                </div>
                <button 
                className="mt-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md shadow"
                type="submit">
                    Submit Scores
                </button>
            </div>
        </form>

    )
}
