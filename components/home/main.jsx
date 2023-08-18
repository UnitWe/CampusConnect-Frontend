'use client'
import React, { useState } from "react"

import useFetch from "../hooks/useFetch"

import timeDifference from "@/functions/timeDifference";
import { ChevronLeft, ChevronRight, MessageCircle, Heart } from "lucide-react";

export default function main() {


    const [posts, setPosts] = React.useState([]);
    const [data, setData] = React.useState(null);
    const { error, loading, request } = useFetch();
   
    const [currentPage, setCurrentpage] = useState(1)
    const [limit, setLimit] = useState(5)


    React.useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                    
            };
            const url = `${process.env.NEXT_PUBLIC_ENV_BLOG_SERVICE}/post?limit=${limit}&current=${currentPage}`
            const { response, json } = await request(url, options);
            
            if (response.ok) {
                setPosts(json.data)
                setData(json)
                console.log(json)
            }
        };

        fetchData();
    }, [request, currentPage]);



    return (
        <main className="mt-20 px-4 text-zinc-200">
            <div className="max-w-4xl m-auto mb-12">

                {loading && <p>Carregando...</p>}

                {Array.isArray(posts) && posts.length > 0 ? (

                    posts.map((post, index) => {
                        const postUrl = `${post.author.username}/${post.id}`;
                        const authorProfile = `/${post.author.username}`
                        return (
                            <div key={post.id} className="mb-5 mx-auto p-5 bg-gray-dark w-[600px] rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="rounded-full bg-white w-8 h-8"></div>
                                    <div className="flex flex-col">
                                        <a href={authorProfile} className="text-xs text-zinc-300 capitalize">{post.author.username}</a>
                                        <span className="text-xs text-zinc-300">{timeDifference(post.createdAt)}</span>
                                    </div>
                                </div>
                                <div className="ml-7 mr-7">
                                    <a href={postUrl} className=" duration-100 hover:text-purple text-white text-2xl font-semibold">
                                        {post.title}
                                    </a>
                                    
                                    <div className="space-x-4 mb-6 mt-1">
                                        {post.tags.map((tag, index) => (
                                            <span key={index} className="w-max inline-block text-tags-color-text text-xs bg-tags-bg-color rounded py-0.5 px-1.5">{tag} </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between gap-6 mt-0.5">
                                        <div className="flex items-center gap-6">
                                            <span className="text-xs text-zinc-400 flex items-center gap-2">
                                                <Heart width={16} height={16}/>
                                                <p>{post.likes} likes</p>
                                            </span>
                                            <span className="text-xs text-zinc-400 flex items-center gap-2">
                                                <MessageCircle width={16} height={16}/> 
                                                <p>{post._count.comments} comentários</p>
                                            </span>
                                        </div>
                                        <span className="text-xs text-zinc-400">
                                        {post.reading_time} min leitura
                                        </span>
                                        
                                      
                                        
                                    </div>
                                </div>


                            </div>
                        );
                    })


                ) : (
                    <p>Nenhum post encontrado.</p>
                )}

                <div className="flex gap-6 mx-auto justify-center">
                    <button
                        className={currentPage != 1 ? "text-blue-400 flex items-center" : "text-zinc-500 flex items-center"}
                        disabled={currentPage === 1 ? true : false} onClick={() => setCurrentpage(currentPage - 1)}>
                        <ChevronLeft width={14} />
                        Anterior
                    </button>

                    <button
                        className={data && currentPage != data.totalPages ? "text-blue-400 flex items-center" : "text-zinc-500 flex items-center"}
                        disabled={data && currentPage === data.totalPages ? true : false} onClick={() => setCurrentpage(currentPage + 1)}>
                        Próximo
                        <ChevronRight width={14} />
                    </button>
                </div>
            </div>
        </main>
    )
}