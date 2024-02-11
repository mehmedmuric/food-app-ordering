'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage(){
    const session = useSession();
    const {status} = session;
    const [userName, setUserName] = useState(session?.data?.user?.name || '');
    const [image, setImage] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
        }
    },[session, status]);

    async function handleFileChange(ev){
        const files = ev.target.files;
        const data = new FormData;
        data.set('file', files[0]);
        if(files?.length === 1){
            await fetch('/api/upload', {
                method: 'POST',
                body: data,
                headers: {'Content-Type': 'multipart/form-data'},
            });
            setImage(link);
        }

    }

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName}),
        });
        setIsSaving(false);
        if(response.ok){
            setSaved(true);
        }
    }

    if(status === 'loading'){
        return 'Loading...';
    }

    if(status === 'unauthenticated'){
        return redirect('/login');
    }


    return(
        <section className="mt-8">
            <h1 className="text-center text-primary mb-4 text-4xl">
                Profile
            </h1>
            {saved && (
                <h2 className="text-center bg-green-200 p-4 rounded-lg border border-green-300">Profile Saved!</h2>
            )}
            {isSaving && (
                <h2 className="text-center bg-blue-200 p-4 rounded-lg border border-blue-300">Saving...</h2>  
            )}
            <div className="max-w-xs mx-auto">
                <div className="flex gap-2 items-center">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
                            {image && (
                                <Image className="rounded-lg w-full h-full mb-4" src={image} width={250} height={250}/>
                            )}
                                <label>
                                    <input type="file" className="hidden" onChange={handleFileChange}/>
                                    <span className="border rounded-lg p-2 text-center cursor-pointer block">Change Picture</span>
                                </label>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="first and last name"
                            value={userName} onChange={ev => setUserName(ev.target.value)}
                        />
                        <input type="email" value={session.data.user.email} disabled={true}/>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}