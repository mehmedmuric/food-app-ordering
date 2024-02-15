'use client'

import { UseProfile } from "@/app/components/UseProfile";
import UserTabs from "../../components/UserTabs";
import UserForm from "@/app/components/UserForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function EditUserPage(){
    const {loading, data} = UseProfile();
    const [user, setUser] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetch('/api/users').then(res => {
            res.json().then(users => {
                const user = users.find(u => u._id === id);
                setUser(user);
            });
        })
    }, []);

    async function handleSaveButtonClick(ev, data){
        ev.preventDefault();
        const promise = new Promise(async(resolve, reject) => {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                body: JSON.stringify({...data, _id:id}),
                headers: {'Content-Type': 'application/json'},
            });
            if(res.ok){
                resolve();
            }else{
                reject();
            }
        });
        await toast.promise(promise, {
            loading: 'Loading...',
            success: 'Saved!',
            error: 'Error',
        });
    }


    // if(loading){
    //     return 'Loading..';
    // }
    // if(!data.admin){
    //     return 'Not an admin!';
    // }

    return(
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick}/>
            </div>
        </section>
    );
}