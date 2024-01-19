'use client'

import Image from "next/image";
import {useState} from "react";

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function handleFormSubmit(ev) {
        ev.preventDefault();
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
    }
    return(
        <section className="mt-8 mb-10">
          <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
          <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input type="email" placeholder="email" value={email}
                onChange={ev => setEmail(ev.target.value)}
            />
            <input type="password" placeholder="password" value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <button type="submit">Register</button>
            <div className="my-4 text-center text-gray-500">
                or login with provider
            </div>
            <button className="justify-center items-center flex gap-4 border border-gray-400">
                <Image src={'/google.png'} alt={''} width={32} height={32}/>
                Login with Google 
            </button>
          </form>
        </section>
    );
}