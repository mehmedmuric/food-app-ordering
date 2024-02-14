'use client'

import toast from "react-hot-toast";
import {UseProfile} from "../../../components/UseProfile";
import { useEffect, useState } from "react";
import UserTabs from "../../../components/UserTabs";
import EditableImages from "../../../components/EditableImages";
import Link from "next/link";
import Left from "@/app/components/icons/Left";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "../../../components/MenuItemForm";
import DeleteButton from "@/app/components/DeleteButton";



export default function EditMenuItemPage(){
    const {id} = useParams();
    const {loading, data} = UseProfile();
    const [menuItem, setMenuItem] = useState(null);
   
    const [redirectToItems, setRedirectToItems] = useState(false);


    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item);
            })
        });

    }, []);


    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
          const res = await fetch('/api/menu-items?_id='+id, {
            method: 'DELETE',
          });
          if (res.ok)
            resolve();
          else
            reject();
        });
    
        await toast.promise(promise, {
          loading: 'Deleting...',
          success: 'Deleted',
          error: 'Error',
        });
    
        setRedirectToItems(true);
      }



    async function handleFormSubmit(ev, data){
        ev.preventDefault();
        data = {...data, _id:id};
        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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
    }

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
        <MenuItemForm  menuItem={menuItem} onSubmit={handleFormSubmit}/>
        <div className="max-w-md mx-auto mt-4">
            <div className="max-w-xs ml-auto pl-4">
                <DeleteButton label="Delete this menu item" onDelete={handleDeleteClick}/>
            </div>
        </div>
     </section>
    );
}