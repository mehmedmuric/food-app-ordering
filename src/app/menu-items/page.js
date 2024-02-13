'use client';
import Link from "next/link";
import { UseProfile } from "../components/UseProfile";
import UserTabs from "../components/UserTabs";
import Right from "../components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function MenuItemsPage(){
    const {loading, data} = UseProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        })
    }, [])

    // if(loading){
    //     return 'Loading user info...';
    // }

    // if(!data.admin){
    //     return 'Not an admin!';
    // }


    return(
       <section className="mt-8 max-w-md mx-auto">
         <UserTabs isAdmin={true}/>
         <div className="mt-8">
            <Link className="button flex" href={'/menu-items/new'}>Create new menu item <Right/></Link>
         </div>
         <div>
            <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
            <div className="grid grid-cols-3 gap-2">
                {menuItems?.length > 0 && menuItems.map(item => (
                    <Link href={'/menu-items/edit/'+item._id} className="button mb-2 flex-col">
                        <div className="relative">
                            <Image src={item.image} alt={''} width={100} height={100} layout="fill"/>
                        </div>
                        <div className="text-center">
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>
         </div>
       </section>
    );
}