'use client'
import React from "react";
import useFetch from "../hooks/useFetch"
import * as jose from 'jose'

export default function post({ title, content, user, comments=[] }) {

    const [readingTimeMinutes, setReadingTimeMinutes] = React.useState(0)
    const [response, setResponse] = React.useState(false)
    const [comment, setComment] = React.useState('')
    const [userId, setUserId] = React.useState(0)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postId = urlParams.get('post_id');

    const { error, loading, request } = useFetch()  

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = "http://localhost:8000/create_comment/"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, comment, postId }),
        };

        const { response, json } = await request(url, options);

        if (response.ok) {
            console.log(json)
        }


    }


    const estimateReadingTime = (text) => {
        const averageWordsPerMinute = 200;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTimeMinutes = Math.ceil(wordCount / averageWordsPerMinute);
        setReadingTimeMinutes(readingTimeMinutes)
    }

    React.useEffect(() => {
        if (content) {
            estimateReadingTime(content)
        }

    }, [])


    return (
        <main className="mt-20 px-4">
            <div className="max-w-4xl m-auto mb-12">
                <div className="flex items-center gap-2 mb-2">
                    <a className=" text-blue-500 text-xs bg-blue-950 rounded-md py-0.5 px-1.5" href={`/${user}`}>{user}</a>
                    <span className=" text-xs text-zinc-500/80">{readingTimeMinutes} min de leitura</span>
                </div>

                <h1 className='text-3xl font-semibold break-words mb-4'>{title}</h1>
                <p style={{ whiteSpace: 'pre-wrap' }} className='mb-4'>{content}</p>
                {
                    response ?
                        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
                            <textarea rows="7" cols="30" required placeholder="Comente algo aqui!" style={{ resize: 'none' }} value={comment} onChange={(e) => setComment(e.target.value)} className="p-4 rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2" />
                            <div className="flex justify-end gap-4">
                                <button onClick={() => setResponse(!response)} href="#" className="text-sm text-zinc-500/80 duration-100 px-3 py-1 rounded-md hover:bg-zinc-600/50">Cancelar</button>
                                <button type="submit" className=" bg-green-600 text-sm px-3 py-1.5 rounded-md">Comentar</button>
                            </div>
                        </form> :
                        <button className=" px-3 py-1.5 border border-zinc-700 bg-zinc-800 rounded-md text-sm" onClick={() => setResponse(!response)}>Comentar</button>
                }
                <div>
                {
                    comments ? 
                    comments.map((post, index) => (
                        <div key={index} className="mt-3">
                            <span className="text-blue-500 text-xs bg-blue-950 rounded-md py-0.5 px-1.5">{post.user.name}</span>
                            <p style={{ whiteSpace: 'pre-wrap' }} className='mb-4'>{post.content}</p>

                        </div>
                    )) : <p>Seja o primeiro a comentar</p>

                }
                </div>

                

            </div>
        </main>
    )
}