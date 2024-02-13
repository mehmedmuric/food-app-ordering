'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoBox from "../components/infoBox";
import SuccessBox from "../components/successBox";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "../components/UserTabs";
import EditableImages from "../components/EditableImages";

export default function ProfilePage(){
    const session = useSession();
    const {status} = session;
    const [userName, setUserName] = useState(session?.data?.user?.name || '');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);


    useEffect(() => {
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    },[session, status]);


    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        toast('Saving...');
        const savingPromise = new Promise(async(resolve, reject) => {
            const response = fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: userName, 
                    image,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    country,
                
                }),
            });
            if(response.ok) 
                resolve(); 
            else 
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile Saved!',
            error: 'Error',
        });
    }

    if(status === 'loading' || !profileFetched){
        return 'Loading...';
    }

    if(status === 'unauthenticated'){
        return redirect('/login');
    }


    return(
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}/>
            <div className="max-w-xs mx-auto mt-8">
                <div className="flex gap-4 items-center">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
                            <EditableImages link={image} setLink={setImage}/>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="first and last name"
                            value={userName} onChange={ev => setUserName(ev.target.value)}
                        />
                        <input type="email" value={session.data.user.email} disabled={true}/>
                        <input type="tel" placeholder="Phone number"
                            value={phone} onChange={ev => setPhone(ev.target.value)}
                        />
                        <input type="text" placeholder="Street Address"
                            value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}
                        />
                        <div className="flex gap-2">
                            <input type="text" placeholder="Postal Code"
                                value={postalCode} onChange={ev => setPostalCode(ev.target.value)}
                            />
                            <input type="text" placeholder="City"
                                value={city} onChange={ev => setCity(ev.target.value)}
                            />
                        </div>
                        <input type="text" placeholder="Country"
                            value={country} onChange={ev => setCountry(ev.target.value)}
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}