'use client'
import React from 'react';
import { usePathname } from 'next/navigation'
import useFetch from '../../../components/hooks/useFetch'
import Post from '@/components/post/post';
import Header from '@/components/header';


export default function Page({ params }) {
    const [post, setPost] = React.useState(null);
    const { error, loading, request } = useFetch();

    const pathname = usePathname()
    const parts = pathname.split('/');
    const username = parts[parts.length - 2]
    const id = parts[parts.length - 1];


    React.useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:5001/api/v1/post/${username}/${id}`
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            };

            const { response, json } = await request(url, options);

            if (response.ok) {
                setPost(json.data)
            }
        };
        
        fetchData()
    }, [request]);



    return (
        <>
            {loading && <p>Carregando...</p>}
            {
                post ?
                    <>
                        <Header/>
                        <Post title={post.title} content={post.content} author={post.author} post_id={post._id} comments={post.comments ? post.comments : []}/>
                    </>
                    
                    : ""
            }
        </>
    )
}