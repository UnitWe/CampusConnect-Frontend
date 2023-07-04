'use client'
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useFetch from '../../../components/hooks/useFetch'


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
        <div>

            {loading && <p>Carregando...</p>}
            {
                post ?
                    <div>
                        <h1>User: {post.user}</h1>
                        <h2>Title: {post.title}</h2>
                        <h3>post_id: {post_id}</h3>
                        <p>{post.content}</p>
                    </div>
                    : ""
            }
        </div>
    )
}