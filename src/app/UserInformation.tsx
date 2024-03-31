import React, { useEffect, useState } from "react";
import UserService from "@/frontend_services/user";
import UserInterface from "@/entities/userEntity";
import Link from 'next/link';
import LoadingComponent from "@/app/LoadingComponent";

const UserInformation = (props: {email: string}) => {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [refreshUser, setRefreshUser] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await UserService.getUser(props.email);
            if(res.user){
                setUser(res.user);
                setIsLoading(false);
            }else{
                setIsLoading(false);
            }
        };
        fetchUser().catch(console.error);
    }, [props.email, refreshUser]);

    const handleFormSubmit = async () =>{
        const res =  await UserService.createNewUser(props.email, displayName, accessCode, firstName, lastName);
        if(res.user){
            setIsLoading(true);
            setRefreshUser(prev => !prev);
        }
    }
    if(isLoading){
        return <LoadingComponent/>;
    }
    else if (!isLoading && !user) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-xl font-bold mb-6">Please enter your information: </h1>
                <label className="input input-bordered flex items-center gap-4 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 opacity-70">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input type="text" className="grow" placeholder="First Name" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                </label>
                <label className="input input-bordered flex items-center gap-4 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow" placeholder="Last Name" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                </label>
                <label className="input input-bordered flex items-center gap-4 mb-4 tooltip tooltip-right" data-tip="This is will be seen by other players, be creative!">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    <input type="text" className="grow" placeholder="Display Name" value={displayName} onChange={(e)=> setDisplayName(e.target.value)}/>
                </label>
                <label className="input input-bordered flex items-center gap-4 mb-4 tooltip tooltip-right" data-tip="Ask Rohan for this">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="text" className="grow" placeholder="League Access Code" value={accessCode} onChange={(e)=> setAccessCode(e.target.value)}/>
                </label>
                <button className="btn btn-primary mt-4" type="button" onClick={handleFormSubmit}>Lets Go!</button>
            </div>
        );
    }else{
        return (
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-max">
                        <h1 className="text-5xl font-bold py-8">Welcome {user!.firstName}</h1>
                        <Link href="/dashboard" passHref>
                            <button className="btn btn-primary" type="button">Enter</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default UserInformation;
