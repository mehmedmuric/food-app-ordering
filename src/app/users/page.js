'use client'

import { useEffect, useState } from "react";
import { UseProfile } from "../components/UseProfile";
import UserTabs from "../components/UserTabs";
import Link from "next/link";

export default function UsersPage(){
    const {loading, data} = UseProfile();
    const[users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            });
        })
    }, []);

    // if(loading){
    //     return 'Loading...';
    // }

    // if(!data.admin){
    //     return 'Not an admin';
    // }

    return(
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                {users?.length > 0 && users.map(user => (
                    <div className="flex mb-2 p-1 gap-4 pl-8 items-center rounded-lg bg-gray-400">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                            <div className="text-gray-700">
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">No name</span>)}
                            </div>
                            <span className="text-gray-500">{user.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={'/users/'+user._id}>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}