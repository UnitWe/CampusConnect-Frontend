'use client'
import React from "react";
import useFetch from "../hooks/useFetch"
import Image from "next/image";
import Avatar from "../../public/images/avatar.webp"
import { Bookmark, Heart, MessagesSquare, Share } from "lucide-react";
import verifyJwtToken from "../hooks/verifyJwtToken";
import renderCommentContent from "../../functions/renderCommentContent";
import timeDifference from "@/functions/timeDifference";
import NullAvatar from '../../public/images/avatarNull.png'


import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks'
import remarkHtml from 'remark-html'
import rehypeRaw from 'rehype-raw';


export default function post({ commentsCount, createdAt, title, content, author, post_id, likes, comments = [], reading_time }) {
    const {verify} = verifyJwtToken()
    const [response, setResponse] = React.useState(false)
    const [comment, setComment] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [isLogged, setIsLogged] = React.useState(false)
    const [countLikes, setCountLikes] = React.useState(likes || 0)
    const [disabled, setDisabled] = React.useState(false)
    const [user, setUser] = React.useState(null)



    const { error, loading, request } = useFetch()


    const handleSubmit = async (e) => {
        const url = `${process.env.NEXT_PUBLIC_ENV_BLOG_SERVICE}/comment`
        if (isLogged) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, post_id, content: comment }),
            };
            const { response, json } = await request(url, options);
            if (response.ok) {
                console.log("commented")
                
            }

        }

    }


    const verifyToken = async (token) => {
        const {decoded} = await verify(token)
        if (decoded) {
            setUsername(decoded.payload.username)
            setIsLogged(true)
            console.log('logado')
        } else {
            setIsLogged(false)
            console.log('token invalido')
        }

    }

    React.useEffect(() => {
        const token = localStorage.getItem('token')


        if (token) {
            verifyToken(token)
        }

        fetchData()
    }, [])

    const handleLikeFetch = async () => {
        const url = `${process.env.NEXT_PUBLIC_ENV_BLOG_SERVICE}/post/${post_id}/like`
        if (isLogged) {
            const options = {
                method: 'PATCH',
            };
            const { response, json } = await request(url, options);
            if (response.ok) {
                console.log("liked")
            }
            setCountLikes(likes + 1)
            setDisabled(true)
        } 
        setDisabled(true)
        
    }

    const fetchData = async () => {
        const url = `${process.env.NEXT_PUBLIC_ENV_USER_SERVICE}/user/${author}/show`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { response, json } = await request(url, options);

        if (response.ok && json !== null) {
            setUser(json)
            console.log(json)
        } else {
            console.log('usuario não existe')
        }
    }


    return (
        <main className="mt-20 px-4 text-zinc-200">
            <div className="max-w-3xl m-auto mb-12">
                <h1 className='text-5xl font-semibold break-words mb-6'>{title}</h1>
                <div className="flex items-start gap-2 mb-6">
                    <Image className="rounded-full" width={44} height={44} src={user && user.pic_url? user.pic_url: NullAvatar}/>
                    <div>
                        <a href={`/${author}`} className="block w-max mb-1 text-blue-500 text-xs bg-blue-950 rounded-md py-0.5 px-1.5">{author}</a>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-500/80">{reading_time} min de leitura</span>
                            <span className="text-xs text-zinc-500/80">{timeDifference(createdAt)}</span>
                        </div>
                        
                    </div>
                </div>
                <div className="flex items-center justify-between px-2 border-t border-b py-2 border-zinc-900 mb-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <button disabled={disabled ? true : false} onClick={handleLikeFetch}>
                                <Heart width={20}  strokeWidth={1}/>
                            </button>
                            <span className="text-xs text-zinc-500/80">{countLikes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessagesSquare width={20} strokeWidth={1}/>
                            <span className="text-xs text-zinc-500/80">{commentsCount}</span>
                        </div>
                    </div>
                    

                    <div className="flex items-center gap-6">
                        <div>
                            <Share width={20} strokeWidth={1}/>
                        </div>
                        <div>
                            <Bookmark width={20} strokeWidth={1}/>
                        </div>
                    </div>
                    
                </div>
    
                <ReactMarkdown linkTarget="_blank" className="prose prose-invert mb-10 max-w-full" remarkPlugins={[remarkGfm, remarkBreaks, remarkHtml]} rehypePlugins={[rehypeRaw]}>
                    {content ? content : ''}    
                </ReactMarkdown>
    
                {
                    response ?
                        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
                            <textarea rows="7" cols="30" required placeholder="Comente algo aqui!" style={{ resize: 'none' }} value={comment} onChange={(e) => setComment(e.target.value)} className="p-4 rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2" />
                            <div className="flex justify-end gap-4">
                                <button onClick={() => setResponse(!response)} href="#" className="text-sm text-zinc-500/80 duration-100 px-3 py-1 rounded-md hover:bg-zinc-600/50">Cancelar</button>
                                <button type="submit" className=" bg-green-600 text-sm px-3 py-1.5 rounded-md">Comentar</button>
                            </div>
                        </form> :
                        <div className="p-4 border border-zinc-600 rounded-md">
                            <button className=" px-3 py-1.5 border border-zinc-700 bg-zinc-800 rounded-md text-sm" onClick={() => setResponse(!response)}>Comentar</button>
                        </div>

                }
                <div>
                    {
                        comments && comments.length > 0 ? (
                            comments.map((post, index) => (
                                <div key={index} className="mt-4">
                                    <span className="text-blue-500 text-xs bg-blue-950 rounded-md py-0.5 px-1.5">
                                        {post.username}
                                    </span>
                                    <p style={{ whiteSpace: 'pre-wrap' }} className="mb-4 mt-2 text-sm">
                                        {renderCommentContent(post.content)}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="mt-4 text-sm text-zinc-600">Seja o primeiro a comentar</p>
                        )
                    }
                </div>



            </div>
        </main>
    )
}