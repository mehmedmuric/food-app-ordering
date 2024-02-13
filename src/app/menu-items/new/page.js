'use client'
import toast from "react-hot-toast";
import {UseProfile} from "../../components/UseProfile";
import { useState } from "react";
import UserTabs from "../../components/UserTabs";
import EditableImages from "../../components/EditableImages";
import Link from "next/link";
import Left from "@/app/components/icons/Left";
import { redirect } from "next/navigation";

export default function NewMenuItemPage(){
    const {loading, data} = UseProfile();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [redirectToItems, setRedirectToItems] = useState(false);


    async function handleFormSubmit(ev){
        ev.preventDefault();
        const data = {image, name, description, basePrice};
        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });
            if(response.ok){
                resolve();
            }else{
                reject();
            }
        });
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Saved!',
            error: 'Error',
        });
        setRedirectToItems(true);
    };

    if(redirectToItems){
        return redirect('/menu-items');
    }

    // if(loading){
    //     return 'Loading...';
    // }
    // if(!data.admin){
    //     return 'Not an admin!';
    // }

    return(
        <section className="mt-8">
        <UserTabs isAdmin={true}/>
        <div className="mx-auto max-w-md mt-8">
            <Link href={'/menu-items'} className="button">
                <Left />
                <span>Show all menu items</span>
            </Link>
        </div>
        <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
         <div className="grid items-start gap-4" style={{gridTemplateColumns: '.3fr .7fr'}}>
            <div>
               <EditableImages link={image} setLink={setImage}/>
            </div>
            <div className="grow">
               <label>Item name</label>
               <input value={name} onChange={ev => setName(ev.target.value)} type="text"/>
               <label>Description</label>
               <input value={description} onChange={ev => setDescription(ev.target.value)} type="text"/>
               <label>Price</label>
               <input value={basePrice} onChange={ev => setBasePrice(ev.target.value)} type="text"/>
               <button type="submit">Save</button>
            </div>
         </div>
        </form>
     </section>
    );
}