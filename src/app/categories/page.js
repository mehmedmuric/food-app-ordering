'use client'
import { useEffect, useState } from "react";
import UserTabs from "../components/UserTabs";
import {UseProfile} from "../components/UseProfile";
export default function CategoriesPage(){
    
    const {loading: profileLoading, data: profileData} = UseProfile();

    if(profileLoading){
        return 'Loading user info...';
    }

    if(!profileData.admin){
        return 'Not an admin!';
    }

    return(
        <section className="mt-8 max-w-lg mx-auto">
           <UserTabs isAdmin={true}/> 
        </section>
    );
}