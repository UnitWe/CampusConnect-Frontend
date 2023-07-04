'use client'
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';


export default function Page({ params }) {

    const pathname = usePathname()
    const encodedPath = pathname.replace('%20', ' ');
    const parts = encodedPath.substring(1).split('/');
    const user = parts[0];
    const encodedTitle = parts[1];
    const title = decodeURIComponent(encodedTitle);
    

    const [post, setPost] = React.useState(null);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const post_id = urlParams.get('post_id');

    React.useEffect(() => {
        fetchPost();
    }, [post_id]);



    const fetchPost = async () => {
        try {
            const response = await fetch('http://localhost:8000/post_detail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post_id }),
            });
            const responseData = await response.json();
            const data = responseData.data; 
            setPost(data)
        } catch (error) {
            console.error('Erro ao buscar os posts:', error);
        }
    };
    

    return (
        <div>
            <h1>User: {user}</h1>
            <h2>Title: {title}</h2>
            <h3>post_id: {post_id}</h3>
            {
                post ? <p>{post.content}</p> : ""
            }
        </div>
    )
}