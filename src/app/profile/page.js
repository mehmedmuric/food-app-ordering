'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoBox from "../components/infoBox";
import SuccessBox from "../components/successBox";
import toast from "react-hot-toast";

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
                })
            });
        }
    },[session, status]);

    async function handleFileChange(ev){
        const files = ev.target.files;
        if(files?.length === 1){
            const data = new FormData;
            data.set('file', files[0]);

            
                const uploadPromise = fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                }).then(response => {
                    if(response.ok){
                        return response.json().then(link => {
                            setImage(link);
                            resolve();
                        });
                    }
                    throw new Error('error');
                });

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload Complete!',
                error: 'Error',
            });
            
        }

    }

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
            <div className="max-w-xs mx-auto">
                <div className="flex gap-4 items-center">
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