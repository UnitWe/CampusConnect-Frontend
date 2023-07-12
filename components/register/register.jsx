'use client'
import React, { useState } from 'react';
import * as dotenv from 'dotenv'

dotenv.config()


export default function Register() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

   
    const registerUser = async (e) => {
        e.preventDefault(); // Prevent form submission
        
        
        try {
            const response = await fetch(`${process.env.USER_SERVICE}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }), // Include the username field in the request body
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
                
            }
        } catch (error) {
            console.error('An error occurred during registration:', error);
            
        }
    };
    

    return (
        <div className="flex items-center justify-center h-screen px-4">
            <div className="max-w-xl mt-14">
                <form onSubmit={registerUser} className="flex flex-col gap-4 w-full">
                    <h1 className="font-semibold text-3xl">Register</h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-2 h-11 rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-2 h-11 rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-2 h-11 rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2"
                        />
                    </div>
                    <button className="text-sm h-11 rounded bg-bg-button-color" type="submit">
                        Register
                    </button>
                </form>
                <div className="w-full h-0.5 bg-zinc-700 mt-8"></div>
                <div className="text-sm flex gap-5 items-center justify-center mt-8 flex-wrap">
                    <a href="#" className="text-blue-500 hover:underline">
                        Contato
                    </a>
                    <a href="#" className="text-blue-500 hover:underline">
                        Github
                    </a>
                    <a href="#" className="text-blue-500 hover:underline">
                        Museu
                    </a>
                    <a href="#" className="text-blue-500 hover:underline">
                        RSSS
                    </a>
                    <a href="#" className="text-blue-500 hover:underline">
                        Sobre
                    </a>
                    <a href="#" className="text-blue-500 hover:underline">
                        Status
                    </a>
                    <a href="#" className="text-blue-500 hover:underline">
                        Termos de uso
                    </a>
                </div>
            </div>
        </div>
    );
}
