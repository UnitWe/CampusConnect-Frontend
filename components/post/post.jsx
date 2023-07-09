'use client'
import React from "react";
import useFetch from "../hooks/useFetch"
import * as jose from 'jose'
import Image from "next/image";
import Avatar from "../../public/images/avatar.webp"
import { Bookmark, Heart, MessagesSquare, Share } from "lucide-react";

export default function post({ title, content, author, post_id, comments = [] }) {

    const [readingTimeMinutes, setReadingTimeMinutes] = React.useState(0)
    const [response, setResponse] = React.useState(false)
    const [comment, setComment] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [isLogged, setIsLogged] = React.useState(false)


    const { error, loading, request } = useFetch()

    const renderCommentContent = (content) => {
        // Expressão regular para encontrar URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = content.split(urlRegex); // Divide o conteúdo em partes com base nas URLs
        return parts.map((part, index) => {
          if (part.match(urlRegex)) {
            // Se a parte corresponder à URL, renderiza como um link
            return (
              <a className=" text-blue-500 hover:underline" href={part} target="_blank" rel="noopener noreferrer" key={index}>
                {part}
              </a>
            );
          } else {
            // Caso contrário, renderiza o texto normalmente
            return <React.Fragment key={index}>{part}</React.Fragment>;
          }
        });
      };

    const handleSubmit = async (e) => {

        const url = "http://localhost:5001/api/v1/post/comment"

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


    const estimateReadingTime = (text) => {
        const averageWordsPerMinute = 200;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTimeMinutes = Math.ceil(wordCount / averageWordsPerMinute);
        setReadingTimeMinutes(readingTimeMinutes)
    }

    const verifyToken = async (token) => {
        try {
            const EncodedSecretKey = new TextEncoder().encode('asdsddasybudsa');
            const decoded = await jose.jwtVerify(token, EncodedSecretKey, { algorithms: ['HS256'] });
            setUsername(decoded.payload.username)
            setIsLogged(true)
        } catch (e) {
            setIsLogged(false)
        }

    }

    React.useEffect(() => {
        if (content) {
            estimateReadingTime(content)
        }
        const token = localStorage.getItem('token')

        if (token) {
            verifyToken(token)
        }


    }, [])


    return (
        <main className="mt-20 px-4">
            <div className="max-w-3xl m-auto mb-12">
                <h1 className='text-4xl font-semibold break-words mb-6'>{title}</h1>
                <div className="flex items-start gap-2 mb-6">
                    <Image className="rounded-full" width={44} height={44} src={Avatar}/>
                    <div>
                        <a href={`/${author}`} className="block w-max mb-1 text-blue-500 text-xs bg-blue-950 rounded-md py-0.5 px-1.5">{author}</a>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-500/80">{readingTimeMinutes} min de leitura</span>
                            <span className="text-xs text-zinc-500/80">1 day ago</span>
                        </div>
                        
                    </div>
                </div>
                <div className="flex items-center justify-between px-2 border-t border-b py-2 border-zinc-900 mb-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Heart width={20}  strokeWidth={1}/>
                            <span className="text-xs text-zinc-500/80">500</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessagesSquare width={20} strokeWidth={1}/>
                            <span className="text-xs text-zinc-500/80">9</span>
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
                <p style={{ whiteSpace: 'pre-wrap' }} className='mb-4'>{renderCommentContent(content)}</p>
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