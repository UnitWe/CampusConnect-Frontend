'use client'
import React, { useState, useEffect } from 'react';
import Input from '../input';
import Button from '../button';
export default function login() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const registerUser = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch('http://localhost:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), 
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.message);
                window.location.href = '/';

            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.message);

            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            
        }
    };

    const inputStyles = "px-2 h-11 rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2"
    const buttonStyles = "text-sm h-11 rounded bg-bg-button-color"
    return (
        <div className="flex items-center justify-center h-screen px-4">
            <div className=" max-w-xl mt-14">
                <form action="" onSubmit={registerUser} className="flex flex-col gap-4 w-full">
                    <h1 className="font-semibold text-3xl">Login</h1>
                    <div className="flex flex-col gap-1">
                        <Input type="text" name="email" label="Email" inputStyles={inputStyles} onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Input type="text" name="password" label="Password" inputStyles={inputStyles} onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </div>
                    <Button buttonStyles={buttonStyles}>Login</Button>
                </form>
                <div className="mt-10">
                    <div className="flex items-center justify-center text-sm gap-1">
                        <p className="">Novo no tabnews?</p>
                        <a href="" className=" text-blue-500 hover:underline"> Crie sua conta aqui.</a>
                    </div>
                    <div className="flex items-center justify-center text-sm gap-1">
                        <p className="">Esqueceu sua senha?</p>
                        <a href="" className=" text-blue-500 hover:underline"> Clique aqui.</a>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-zinc-700 mt-8"></div>
                <div className="text-sm flex gap-5 items-center justify-center mt-8 flex-wrap">
                    <a href="#" className="text-blue-500 hover:underline">Contato</a>
                    <a href="#" className="text-blue-500 hover:underline">Github</a>
                    <a href="#" className="text-blue-500 hover:underline">Museu</a>
                    <a href="#" className="text-blue-500 hover:underline">RSSS</a>
                    <a href="#" className="text-blue-500 hover:underline">Sobre</a>
                    <a href="#" className="text-blue-500 hover:underline">Status</a>
                    <a href="#" className="text-blue-500 hover:underline">Termos de uso</a>
                </div>
            </div>
        </div>
    )
}