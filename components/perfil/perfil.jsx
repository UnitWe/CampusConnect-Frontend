import React, { useEffect } from "react"
import Image from "next/image";
import Avatar from "../../public/images/avatar.webp"
import Settings from "./settings";
import About from "./about";
import Posts from "./posts";

import { Settings as Config, Link } from "lucide-react";
export default function perfil({user, token}) {
    const [page, setPage] = React.useState(1)

    const [permissions, setPermissions] = React.useState(false)


    useEffect(() => {
        if (user != null) {
            verifyUserId()
        }
    }, [user])

    

    const verifyUserId = () => {
        if (user.id == token) {
            console.log('é o cara')
            setPermissions(true)
        } else {
            console.log('não é o cara ou não está logado')
            setPermissions(false)
        }
    }



    
    return (
        <main className="max-w-5xl  m-auto flex">
            <div className="mb-12 mt-24 flex-1 mr-10">
                <h1 className=" text-4xl font-semibold mb-8">Marcelo Henrique</h1>
                <div className="mb-8 pb-4 border-b border-zinc-800/50 flex gap-6">
                {
                    permissions ? (
                        <>
                            <button onClick={() => setPage(1)} className="hover:underline">posts</button>
                            <button onClick={() => setPage(2)} className="hover:underline">about</button>
                            <button onClick={() => setPage(3)} className="hover:underline">settings</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setPage(1)} className="hover:underline">posts</button>
                            <button onClick={() => setPage(2)} className="hover:underline">about</button>
                        </>
                    )
                }
                    
                </div>
                {
                    permissions ? (
                        <>
                            {page === 1 && <Posts />}
                            {page === 2 && <About />}
                            {page === 3 && <Settings />}
                        </>
                    ) : (
                        <>
                            {page === 1 && <Posts />}
                            {page === 2 && <About />}
                        </>
                    )
                }
            </div>
            <aside className="border-l border-zinc-800/50 px-10 h-screen w-80 ">
                <div className="mt-24">
                    <Image className="rounded-full mb-4" src={Avatar} />
                    <span className="block text-lg">{user && user.name}</span>
                    <div className="mb-4">
                        <span className="block text-sm text-zinc-300">academic level: {user && user.academic_level}</span>
                        <span className="block text-sm text-zinc-300">Course: {user && user.graduation_course}</span>
                        <span className="block text-sm text-zinc-300">Ano de conclusão: {user && user.year_conclusion} </span>
                    </div>

                    <p className=" text-sm mb-3 text-zinc-300">
                        {user && user.biograph}
                    </p>
                    <div className="flex items-center gap-1.5">
                        <Link width={14} color="gray" />
                        <a className="text-zinc-300 hover:underline text-sm" target="_blank" href={user && user.link}>{user && user.link}</a>
                    </div>

                </div>
            </aside>
        </main>
    )
}