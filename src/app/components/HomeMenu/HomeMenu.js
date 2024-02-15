'use client';

import Image from "next/image";
import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "../SectionHeader/SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setBestSellers(menuItems.slice(-3));
            });
        })
    }, [])


    return (
        <section className="">    
            <div className="absolute justify-start left-0 right-0 w-full">
                <div className="absolute left-0 -top-[70px] -z-10">
                    <Image src={'/sallad1.png'} alt={'sallad1'} width={107} height={195}/>
                </div>
                <div className="absolute -top-[100px] right-0 -z-10">
                    <Image src={'/sallad2.png'} alt={'sallad2'} width={107} height={195}/>
                </div>
            </div>
            <div className="text-center">
                <SectionHeaders subHeader={'CHECK OUT'} mainHeader={'Our Best Sellers'}/>
            </div>
            <div className="grid grid-cols-3 gap-4">
               {bestSellers?.length > 0 && bestSellers.map(item => (
                <MenuItem {...item}/>
               ))}
            </div>
        </section>
    );
}