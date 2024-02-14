'use client'
import toast from "react-hot-toast";
import {UseProfile} from "../../components/UseProfile";
import { useState } from "react";
import UserTabs from "../../components/UserTabs";
import EditableImages from "../../components/EditableImages";
import Link from "next/link";
import Left from "@/app/components/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "../../components/MenuItemForm";

export default function NewMenuItemPage({menuItem}){
    const {loading, data} = UseProfile();
    const [redirectToItems, setRedirectToItems] = useState(false);


    async function handleFormSubmit(ev, data){
        ev.preventDefault();
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
        <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
     </section>
    );
}