'use client'
import React from "react"
import useFetch from "../hooks/useFetch"
export default function main() {

    const [posts, setPosts] = React.useState([]);
    const { error, loading, request } = useFetch();
    const url = "http://localhost:8000/"

   

    React.useEffect(() => {
        const fetchData = async () => {
          const options = {
            method: 'GET'
          };

          const {response, json} = await request(url, options);
   
          if (response.ok) {
            setPosts(json.data)
          }
        };
    
        fetchData();
    }, [request, url]);



    return (
        <main className="mt-20 px-4">
            <div className="max-w-4xl m-auto mb-12">

            {loading && <p>Carregando...</p>}

                {Array.isArray(posts) ? (
                    posts.map((post, index) => (
                        <div key={post.id} className="mb-3" >
                            <a href={`/${post.user}/${post.title}?post_id=${post.id}`} className="hover:underline" >
                                {index + 1}. {post.title}
                            </a>
                            <div className="flex items-center gap-2 ml-4 mt-0.5">
                                <span className="text-xs text-zinc-400">4 tabcoins</span>
                                <span className="text-xs text-zinc-400">12 comentários</span>
                                <a href={`/${post.user}`} className="text-xs text-zinc-400 hover:underline">{post.user}</a>
                                <span className="text-xs text-zinc-400">19 horas</span>
                            </div>
                        </div>
                    ))
                ) : <p>Nenhum post encontrado.</p>}

            </div>
        </main>
    )
}