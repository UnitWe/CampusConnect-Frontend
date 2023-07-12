import React from "react";
import useFetch from '../hooks/useFetch'
import { usePathname } from 'next/navigation';

export default function posts() {
    
    const pathname = usePathname()
    const encodedPath = pathname.replace('%20', ' ');
    const parts = encodedPath.substring(1).split('/');
    const user = parts[0];
    const [posts, setPosts] = React.useState(null)
    const { loading, error, request } = useFetch()

    
    const url = `http://localhost:5001/api/v1/post/${user}`

    React.useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
       
            };

            const { response, json } = await request(url, options);

            if (response) {
                setPosts(json.data)

            }
        };

        fetchData()

    }, [request]);

    return (
        <>
            {loading && <p>Carregando...</p>}
            {
                posts && posts.map((post, index) => {
                    const postUrl = `/${post.author}/${post._id}`;
                    return (
                        <div className='mb-4' key={index}>
                            <div className="flex items-center gap-2 ">
                                <span>{index + 1}.</span>
                                <a className='hover:underline' href={postUrl}>{post.title}</a>
                            </div>
                            <div className="flex items-center gap-2 mb-4 ml-5">
                                <a href="#" className="text-xs text-zinc-500/80 ">Tecnology</a>
                                <span className="text-xs text-zinc-500/80">{post.reading_time} min leitura</span>
                            </div>
                        </div>
                    )
                }) 
            }
        </>
    )
}