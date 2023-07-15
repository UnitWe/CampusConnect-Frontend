'use client'
import React, { useState } from "react"

import useFetch from "../hooks/useFetch"

import timeDifference from "@/functions/timeDifference";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function main() {


    const [posts, setPosts] = React.useState([]);
    const [data, setData] = React.useState(null);
    const { error, loading, request } = useFetch();
    const url = `${process.env.NEXT_PUBLIC_ENV_BLOG_SERVICE}/post`
    const [currentPage, setCurrentpage] = useState(1)
    const [limit, setLimit] = useState(5)


    React.useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ current_page: currentPage, limit }),
            };

            const { response, json } = await request(url, options);
            if (response.ok) {
                setPosts(json.data)
                setData(json)
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
                        const postUrl = `${post.author}/${post._id}`;
                        return (
                            <div key={post._id} className="mb-5">
                                <a href={postUrl} className="hover:underline">
                                    {index + 1}. {post.title}
                                </a>
                                <div className="flex items-center gap-2 ml-4 mt-0.5">
                                    <span className="text-xs text-zinc-400">{post.likes} likes</span>
                                    <span className="text-xs text-zinc-400">{post.commentsCount} comentários</span>
                                    <a href={`/${post.author}`} className="text-xs text-zinc-400 hover:underline">
                                        {post.author}
                                    </a>
                                    <span className="text-xs text-zinc-400">{timeDifference(post.createdAt)}</span>
                                </div>
                                <div className="ml-4">
                                    {post.tags.map((tag, index) => (
                                        <span key={index} className="w-max mr-2 inline-block text-blue-500 text-xs bg-blue-950 rounded-md py-0.5 px-1.5">{tag} </span>
                                    ))}
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