'use client'
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useFetch from '../../../components/hooks/useFetch'
import Post from '@/components/post/post';
import Header from '@/components/header';


export default function Page({ params }) {
    const [post, setPost] = React.useState(null);
    const { error, loading, request } = useFetch();
    const url = "http://localhost:8000/post_detail/"

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const post_id = urlParams.get('post_id');


    React.useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post_id }),
            };

            const { response, json } = await request(url, options);

            if (response.ok) {
                setPost(json.data)
            }
        };

        fetchData()

    }, [request, url]);



    return (
        <>
            {loading && <p>Carregando...</p>}
            {
                post ?
                    <>
                        <Header/>
                        <Post title={post.title} content={post.content} user={post.user}/>
                    </>
                    
                    : ""
            }
        </>
    )
}