import React from "react"
import Input from "../input";
import Image from "next/image";
import Avatar from "../../public/images/avatar.webp"
import Settings from "./settings";
import { Settings as Config, BarChartHorizontalBig } from "lucide-react";
export default function perfil({ posts, username }) {
    const [page, setPage] = React.useState(1)
    
    return (
        <main className="max-w-5xl  m-auto flex">
            <div className="mb-12 mt-24 flex-1 mr-10">
                <h1 className=" text-4xl font-semibold mb-8">Marcelo Henrique</h1>
                <div className="mb-8 pb-4 border-b border-zinc-800/50 flex gap-6">
                    <button className="hover:underline">posts</button>
                    <button className="hover:underline">about</button>
                </div>
                 {page == 1 ?
                    <div className="">
                        {
                            posts.map((post, index) => {
                                const postUrl = `/${post.author}/${post._id}`;
                                return (
                                    <div className='mb-4' key={index}>
                                        <div className="flex items-center gap-2 ">
                                            <span>{index + 1}.</span>
                                            <a className='hover:underline' href={postUrl}>{post.title}</a>
                                        </div>
                                        <div className="flex items-center gap-2 mb-4 ml-5">
                                            <a href="#" className="text-xs text-zinc-500/80 ">Tecnology</a>
                                            <span className="text-xs text-zinc-500/80">{post.reading_time} min leitura</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : <Settings/>
                 }
            </div>
            <aside className="border-l border-zinc-800/50 px-10 h-screen w-80 ">
                <div className="mt-24">
                    <Image className="rounded-full mb-4" src={Avatar}/>
                    <span className="block text-lg">Marcelo henrique</span>
                    <div className="mb-4">
                        <span className="block text-sm text-zinc-300">Title: Doctor</span>
                        <span className="block text-sm text-zinc-300">Course: Ciência da computação</span>
                        <span className="block text-sm text-zinc-300">Period: 4 </span>
                    </div>
                    
                    <p className=" text-sm mb-3 text-zinc-300">
                        All the advice I give is based on my own experience.   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                    </p>
                    <div>
                        <span className="mr-1">Site:</span>
                        <a className="text-blue-500 hover:underline text-sm" target="_blank" href="https://marcelocoelho1.github.io/">https://marcelocoelho1.github.io/</a>
                    </div>
                    
                </div>
                
            </aside>
        </main>
    )
}