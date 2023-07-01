'use client'
import Link from 'next/link'
import React, { useEffect } from 'react';
import Image from "next/image"
import Logo from "../public/images/logo.png"
import Avatar from "../public/images/avatar.webp"

export default function header() {

    const [login, setLogin] = React.useState(false)

    /*
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/');
            const data = await response.json();
            console.log(data); 
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
    */

    return (
        <header className=" bg-gray-dark fixed right-0 top-0 left-0 w-full px-2 max-md:px-0">
            <div className="flex items-center px-2 max-w-7xl mx-auto h-14">
                <span className="hidden max-md:flex items-center">
                    <button className="mx-2 p-2">
                        <svg className="fill-zinc-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="atno4p6s0vyo8u1vyz9t1ta9pft0yuex"><title id="atno4p6s0vyo8u1vyz9t1ta9pft0yuex">Navigation menu</title>
                            <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path>
                        </svg>
                    </button>
                </span>
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
                        login ?
                            <div className="flex items-center h-100 ml-auto">
                                <a href="#" className="hidden max-md:block p-2">
                                    <svg className="fill-zinc-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m18.031 16.617 4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path></svg>
                                </a>
                                <span className="ml-auto max-md:hidden">
                                    <a href="/new" className="mr-2 whitespace-nowrap text-purple px-4 py-2 rounded border border-purple hover:bg-purple hover:text-white hover:underline">Create Post</a>
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
                            login ?
                                <button className="p-1">
                                    <Image className="rounded-full" src={Avatar} width={32} height={32} />
                                </button> :
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
