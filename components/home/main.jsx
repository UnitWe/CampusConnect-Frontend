'use client'
import Link from "next/link"
import React from "react"
export default function main() {


    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:8000/');
            const responseData = await response.json();
            const data = responseData.data; // Acessa a propriedade "data" da resposta
            setPosts((prevPosts) => [...prevPosts, ...data]);
        } catch (error) {
            console.error('Erro ao buscar os posts:', error);
        }
    };

    return (
        <main className="mt-20 px-4">
            <div className="max-w-4xl m-auto mb-12">
                {Array.isArray(posts) ? (
                    posts.map((post, index) => (
                        <div key={post.id} className="mb-3" >
                            <Link href={`/${post.user}/${post.id}?post_id=${post.id}`} prefetch={false} className="hover:underline" >
                                {index + 1}. {post.title}
                            </Link>
                            <div className="flex items-center gap-2 ml-4 mt-0.5">
                                <span className="text-xs text-zinc-400">4 tabcoins</span>
                                <span className="text-xs text-zinc-400">12 comentários</span>
                                <Link href={`/${post.user}`} className="text-xs text-zinc-400 hover:underline">{post.user}</Link>
                                <span className="text-xs text-zinc-400">19 horas</span>
                            </div>
                        </div>
                    ))
                ) : <p>Nenhum post encontrado.</p>}

            </div>
        </main>
    )
}