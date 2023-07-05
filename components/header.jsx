'use client'
import Link from 'next/link'
import * as jose from 'jose'
import React, { useEffect } from 'react';
import Image from "next/image"
import Logo from "../public/images/logo.png"
import Avatar from "../public/images/avatar.webp"


export default function header() {

    const [logged, setLogged] = React.useState(false)
    const [menu, setMenu] = React.useState(false)
    const [user, setUser] = React.useState('')


    useEffect(() => {
        const verifyToken = async (token) => {
            try {
                const EncodedSecretKey = new TextEncoder().encode('teste');
                const decoded = await jose.jwtVerify(token, EncodedSecretKey, { algorithms: ['HS256'] });
                const { payload } = decoded
                setUser(payload.payload.username)
                setLogged(true);
            } catch (e) {
                setLogged(false)

            }

        };
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token)
        }

    }, []);



    return (
        <header className=" bg-gray-dark fixed right-0 top-0 left-0 w-full px-2 max-md:px-0">
            <div className="flex items-center px-2 max-w-7xl mx-auto h-14">
                <Link href="/">
                    <Image src={Logo} width={50} height={40} />
                </Link>
                <div className="mx-4">
                    <form action="">
                        <div className="flex items-center relative  max-md:hidden">
                            <input className="w-96 h-10 p-2 bg-black border rounded border-zinc-700 focus:outline-none focus:border-purple focus:border-2" type="text" name="" id="" placeholder="Search..." />
                            <button className="absolute right-2" type="submit">
                                <svg className="fill-zinc-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m18.031 16.617 4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path></svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center ml-auto">
                    {
                        logged ?
                            <div className="flex items-center h-100 ml-auto">
                                <a href="#" className="hidden max-md:block p-2">
                                    <svg className="fill-zinc-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m18.031 16.617 4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path></svg>
                                </a>
                                <span className="ml-auto max-md:hidden">
                                    <Link href="/create_post" className='mr-2 whitespace-nowrap text-purple px-4 py-2 rounded border border-purple hover:bg-purple hover:text-white hover:underline'>Create Post</Link>
                                </span>
                                <a href="/notifications" className="mx-1 p-2 hover:bg-indigo-900/75 rounded">
                                    <svg className="fill-zinc-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="aobclc8t32pcofcuray898alv5kfn144" ><title id="aobclc8t32pcofcuray898alv5kfn144">Notifications</title>
                                        <path d="M20 17h2v2H2v-2h2v-7a8 8 0 1116 0v7zm-2 0v-7a6 6 0 10-12 0v7h12zm-9 4h6v2H9v-2z"></path>
                                    </svg>
                                </a>
                            </div> :
                            ""
                    }

                    <div>
                        {
                            logged ?
                                <div className='relative'>
                                    <button className="p-1" onClick={() => setMenu(!menu)}>
                                        <Image className="rounded-full" src={Avatar} width={32} height={32} />
                                    </button>
                                    {
                                        menu ?
                                            <div className='absolute right-4 top-12 bg-gray-dark border border-zinc-700 rounded-lg py-2 px-2 w-max'>
                                                <ul>
                                                    <li className='px-2 text-sm rounded-lg duration-100 hover:bg-zinc-600/50'>
                                                        <a href="/" className='flex items-center gap-2 text-zinc-200 w-full py-2 '>
                                                            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z"></path></svg>
                                                            {user ? user : ""}
                                                        </a>
                                                    </li>
                                                    <li className='px-2 text-sm rounded-lg duration-100 hover:bg-zinc-600/50'>
                                                        <Link href="/create_post" className='flex items-center gap-2 text-zinc-200 w-full py-2 '>
                                                            Publicar novo conteúdo
                                                        </Link>
                                                    </li>
                                                    <li className='px-2 text-sm rounded-lg duration-100 hover:bg-zinc-600/50'>
                                                        <a href={`/${user}`} className='flex items-center gap-2 text-zinc-200 w-full py-2 '>
                                                            Meus conteúdos
                                                        </a>
                                                    </li>
                                                    <li className='px-2 text-sm rounded-lg duration-100 hover:bg-zinc-600/50'>
                                                        <Link href="#" className='flex items-center gap-2 text-zinc-200 w-full py-2 '>
                                                            Editar perfil
                                                        </Link>
                                                    </li>
                                                    <li className='px-2 text-sm rounded-lg duration-100 hover:bg-red-700/25 '>
                                                        <Link href="#" className='flex items-center text-red-500 gap-2 w-full py-2 '>
                                                            Deslogar
                                                        </Link>
                                                    </li>

                                                </ul>
                                            </div> :
                                            ""
                                    }

                                </div>
                                :
                                <div className="flex gap-5 items-center">
                                    <Link href="/login" className='text-sm font-semibold hover:underline'>Login</Link>
                                    <Link href="/register" className='mr-2 whitespace-nowrap text-purple px-4 py-2 rounded border border-purple hover:bg-purple hover:text-white hover:underline'>Cadastrar</Link>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </header>
    )
}
