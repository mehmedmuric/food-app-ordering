'use client'
import Image from "next/image";
import {useState} from "react"

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginInProgress(true);
        const response = await fetch('/api/login',{
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
        });
        if(response.ok){

        }else{

        }
        setLoginInProgress(false);
    }
    return(
        <section className="mt-8">
            <h1 className="text-center text-primary mb-4 text-4xl">
                Login
            </h1>
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email}
                    disabled={false}
                    onChange={ev => setEmail(ev.target.value)}
                />
                <input type="password" placeholder="password" value={password}
                    disabled={false}
                    onChange={ev => setPassword(ev.target.value)}
                />
                <button type="submit">Login</button>
                <div className="my-4 text-center text-gray-500">
                    Or login with provider
                </div>
                <button className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={''} width={24} height={24}/>
                    Login with Google
                </button>
            </form>
        </section>
    );
}