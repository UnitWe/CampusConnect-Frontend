'use client'
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Perfil from '@/components/perfil/perfil';
import useFetch from '../../components/hooks/useFetch'

export default function Page({ params }) {
    const pathname = usePathname()
    const encodedPath = pathname.replace('%20', ' ');
    const parts = encodedPath.substring(1).split('/');
    const user = parts[0];
    const url = 'http://localhost:8000/user_detail/'

    const { loading, error, request } = useFetch()
    const [posts, setPosts] = React.useState(null)


    React.useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user }),
            };

            const { response, json } = await request(url, options);

            if (response.ok) {
                setPosts(json.data)
            }
        };

        fetchData()

    }, [request]);


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
        <div>
            <h1>Usuário: {user}</h1>
            {loading && <p>Carregando...</p>}
            {posts ?
                posts.map((post, index) => {
                    const slug = createSlug(post.title);
                    const postUrl = `/${post.user}/${slug}?post_id=${post.id}`;
                    return (
                        <div className='flex items-center gap-2' key={index}>
                            <span>{index + 1}.</span>
                            <a className='hover:underline' href={postUrl}>{post.title}</a>
                        </div>
                    )
                })
                : ""
            }
        </div>
    )
}