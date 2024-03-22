import React from 'react';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const router = useRouter()
    return(
        <div className="navbar bg-base-content text-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl hover:bg-base-100 hover:text-base-content" type="button" onClick={() => router.push('/')}>Intellectuals</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li className="tooltip tooltip-bottom tooltip-accent" data-tip="Click here to log your daily game results!"><a type="button" onClick={() => router.push('/dashboard/results')} className="btn btn-ghost hover:bg-base-100 hover:text-base-content mx-4">Log Results</a></li>
                <li className="tooltip tooltip-bottom tooltip-accent" data-tip="Click here to check out your stats!"><a type="button" onClick={() => router.push('/dashboard/stats')} className="btn btn-ghost hover:bg-base-100 hover:text-base-content mx-4">Stats</a></li>
                <li className="tooltip tooltip-bottom tooltip-accent" data-tip="Click here to see who is on top!"><a type="button" onClick={() => router.push('/dashboard')} className="btn btn-ghost hover:bg-base-100 hover:text-base-content mx-4">Leaderboard</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-ghost hover:bg-base-100 hover:text-base-content" href="/api/auth/logout">Logout</a>
            </div>
        </div>
    );
}

export default NavBar;