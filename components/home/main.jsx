'use client'
import React, { useState } from "react"
import useFetch from "../hooks/useFetch"
export default function main() {

    const [posts, setPosts] = React.useState([]);
    const { error, loading, request } = useFetch();
    const url = "http://localhost:3001/blog"
    const [currentPage, setCurrentpage] = useState(1)
    const [perPage, setPerPage] = useState(1)




    React.useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentPage, perPage }),
            };

            const { response, json } = await request(url, options);

            if (response.ok) {
                setPosts(json.data)

                console.log(json)
            } 
        };

        fetchData();
    }, [request, currentPage]);

    const createSlug =(text) => {
        const slug = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
          .replace(/\s+/g, '-') // Substitui espaços por hífens
          .replace(/--+/g, '-') // Remove hífens duplicados
          .trim(); // Remove espaços em branco no início e no fim
      
        return slug;
    }



    return (
        <main className="mt-20 px-4">
            <div className="max-w-4xl m-auto mb-12">

                {loading && <p>Carregando...</p>}

                {Array.isArray(posts) ? (
                    posts.map((post, index) => {
                        //const slug = createSlug(post.title);
                        const postUrl = `${post.authorId.name}/${post._id}`;

                        return (
                            <div key={post._id} className="mb-3">
                                <a href={postUrl} className="hover:underline">
                                    {index + 1}. {post.title}
                                </a>
                                <div className="flex items-center gap-2 ml-4 mt-0.5">
                                    <span className="text-xs text-zinc-400">4 tabcoins</span>
                                    <span className="text-xs text-zinc-400">12 comentários</span>
                                    <a href={`/${post.user}`} className="text-xs text-zinc-400 hover:underline">
                                        {post.user}
                                    </a>
                                    <span className="text-xs text-zinc-400">19 horas</span>
                                </div>
                            </div>
                        );
                    })

                    
                ) : (
                    <p>Nenhum post encontrado.</p>
                )}
                    <div className="flex gap-4">
                        <button onClick={()=> setCurrentpage(currentPage - 1)}>prev</button>
                        <button onClick={()=> setCurrentpage(currentPage + 1)}>next</button> 
                    </div>
                    
                    
            </div>
        </main>
    )
}