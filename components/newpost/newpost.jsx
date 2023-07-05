'use client'
import React from "react"
import Input from "../input"
import * as jose from 'jose'
import { useRouter } from "next/navigation"

export default function newpost() {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const router = useRouter()

    React.useEffect(() => {
        const verifyToken = async (token) => {
            try {
                const EncodedSecretKey = new TextEncoder().encode('teste');
                const decoded = await jose.jwtVerify(token, EncodedSecretKey, { algorithms: ['HS256'] });
            } catch (e) {
                window.location.href = '/login';

            }

        };
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token)
        }

    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const decoded = jose.decodeJwt(token)
        const user_id = decoded.user_id
        console.log(user_id)

        try {
            const response = await fetch('http://localhost:8000/create_post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, user_id }),
            });

            if (response.ok) {
                const data = await response.json();
                router.push('/')

            } else {
                const errorData = await response.json();
                console.error('erro:', errorData.message);

            }
        } catch (error) {
            console.error('Um erro aconteceu durante a criação:', error);

        }
        
    }


    const inputStyles = "px-2 px-4 w-full h-11 rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2"
    return (
        <div className="mt-14 max-w-4xl m-auto py-10 px-4">
            <div className="mb-4">
                <h1 className=" font-semibold text-3xl mt-4">Publicar novo conteúdo</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input type="text" required placeholder="Título" name="title" inputStyles={inputStyles} onChange={(e) => setTitle(e.target.value)} value={title} />
                <textarea rows="12" required cols="30" placeholder="Escreva seu post aqui" style={{resize: 'none'}} value={content} onChange={(e) => setContent(e.target.value)} className="p-4  rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2"/>
                <div className="flex gap-3 items-center justify-end">
                    <a href="/" className="text-sm text-zinc-500/80 duration-100 px-3 py-1.5 rounded-md hover:bg-zinc-600/50">Cancelar</a>
                    <button className=" bg-green-600 text-sm px-3 py-1.5 rounded-md">Publicar</button>
                </div>
            </form>
        </div>
    )
}